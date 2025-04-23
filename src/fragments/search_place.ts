import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { Place } from '../data/place.js'

@inject()
export default class SearchPlaceFragment {
  async handle({ inertia, request }: HttpContext) {
    const params = request.qs()

    if (params.place.length === 0) {
      return inertia.render('places', { places: [] })
    }

    const data = Place.getAll().filter((item) => {
      return item.name.toLowerCase().includes(params.place.toLowerCase())
    })

    return inertia.render('places', { places: data })
  }
}
