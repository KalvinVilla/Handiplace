import type { HttpContext } from '@adonisjs/core/http'

export default class FindController {
  render({ inertia }: HttpContext) {
    return inertia.render('find')
  }
}
