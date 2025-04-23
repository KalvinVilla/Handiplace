import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import { NextFn } from '@adonisjs/core/types/http'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import app from '@adonisjs/core/services/app'

interface Translations {
  [key: string]: string
}

export default class I18nMiddleware {
  async handle({ request, inertia, i18n }: HttpContext, next: NextFn) {
    const routeName = request.url() === '/' ? 'landing' : request.url()
    const locale = i18n.locale
    logger.debug(`Loading translations for route: ${routeName} in locale: ${locale}`)

    let routeTranslations = {}

    try {
      try {
        const routeTranslationsPath = join(app.languageFilesPath(), locale, `${routeName}.json`)
        const routeTranslationsContent = await readFile(routeTranslationsPath, 'utf-8')
        routeTranslations = JSON.parse(routeTranslationsContent) as Translations
      } catch {
        logger.warn(`No translations found for route: ${routeName} in locale: ${locale}`)
      }

      const commonTranslationsPath = join(app.languageFilesPath(), locale, 'common.json')
      const commonTranslationsContent = await readFile(commonTranslationsPath, 'utf-8')
      const commonTranslations = JSON.parse(commonTranslationsContent) as Translations

      const translations: Translations = {
        ...commonTranslations,
        ...routeTranslations,
      }

      inertia.share({
        translations,
        locale,
      })
    } catch (error) {
      logger.error(`No translations found`)
    }

    await next()
  }
}
