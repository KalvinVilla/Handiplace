import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { Place } from '../../data/place.js'

@inject()
export default class PlaceController {
  async render({ inertia, params }: HttpContext) {
    const place = Place.getPlaceById(params.id)

    return inertia.render('places/get', {
      place,
    })
  }
}
