import type { HttpContext } from '@adonisjs/core/http'

export default class RequestController {
  render({ inertia }: HttpContext) {
    return inertia.render('request')
  }
}
