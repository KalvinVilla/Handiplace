import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import vine from '@vinejs/vine'

@inject()
export default class LocaleController {
  static validator = vine.compile(
    vine.object({
      locale: vine.string().in(['fr', 'en']),
    })
  )

  async execute({ request, response, session, i18n }: HttpContext) {
    const { locale } = await request.validateUsing(LocaleController.validator)
    session.put('locale', locale)
    logger.info('here locale')

    logger.info(`Locale after switch: ${i18n.locale}`)
    logger.info(`Session locale: ${session.get('locale')}`)

    // Rediriger vers la page précédente
    return response.redirect().back()
  }
}
