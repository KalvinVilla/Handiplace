import type { HttpContext } from '@adonisjs/core/http'
import { Place } from '../data/place.js'

export default class LandingController {
  render({ inertia }: HttpContext) {
    const top = Place.getTopPlaces(0, 5)

    return inertia.render('landing', {
      topPlaces: top,
    })
  }
}
