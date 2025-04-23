import { RequestValidator, type HttpContext } from '@adonisjs/core/http'
import { I18n } from '@adonisjs/i18n'
import i18nManager from '@adonisjs/i18n/services/main'
import type { NextFn } from '@adonisjs/core/types/http'
import logger from '@adonisjs/core/services/logger'
import { LanguageText } from '#i18n/enums/lang'

/**
 * The "DetectUserLocaleMiddleware" middleware uses i18n service to share
 * a request specific i18n object with the HTTP Context
 */
export default class DetectUserLocaleMiddleware {
  /**
   * Using i18n for validation messages. Applicable to only
   * "request.validateUsing" method calls
   */
  static {
    RequestValidator.messagesProvider = (ctx) => {
      return ctx.i18n.createMessagesProvider()
    }
  }

  /**
   * This method reads the user language from the "Accept-Language"
   * header and returns the best matching locale by checking it
   * against the supported locales.
   *
   * Feel free to use different mechanism for finding user language.
   */
  protected getRequestLocale(ctx: HttpContext) {
    const sessionLocale = ctx.session.get('locale')
    if (sessionLocale) {
      return sessionLocale
    }

    // if (ctx.auth.isAuthenticated) {
    //   const authUser = ctx.auth.getUserOrFail()
    //   if (authUser) {
    //     logger.info('Selected lang from user pref')
    //     logger.info(LanguageText[authUser.props.language as keyof typeof LanguageText])
    //     return LanguageText[authUser.props.language as keyof typeof LanguageText]
    //   }
    // }

    // Verify local in url
    // const urlLocale = ctx.request.url().split('/')[1]
    // if (urlLocale && ['fr', 'en'].includes(urlLocale)) {
    //   logger.info(`Locale from URL: ${urlLocale}`)
    //   return urlLocale
    // }

    // Veriry local with httprequest
    const userLanguages = ctx.request.languages()
    const detectedLocale = i18nManager.getSupportedLocaleFor(userLanguages)
    logger.debug(`Detected locale from browser: ${detectedLocale}`)
    return detectedLocale || i18nManager.defaultLocale
  }

  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Finding user language
     */
    const language = this.getRequestLocale(ctx)
    logger.info(`Setting locale to: ${language}`)

    /**
     * Assigning i18n property to the HTTP context
     */
    ctx.i18n = i18nManager.locale(language)

    /**
     * Binding I18n class to the request specific instance of it.
     * Doing so will allow IoC container to resolve an instance
     * of request specific i18n object when I18n class is
     * injected somwhere.
     */
    ctx.containerResolver.bindValue(I18n, ctx.i18n)

    /**
     * Sharing request specific instance of i18n with edge
     * templates.
     *
     * Remove the following block of code, if you are not using
     * edge templates.
     */
    if ('view' in ctx) {
      ctx.view.share({ i18n: ctx.i18n })
    }

    return next()
  }
}

/**
 * Notify TypeScript about i18n property
 */
declare module '@adonisjs/core/http' {
  export interface HttpContext {
    i18n: I18n
  }
}
