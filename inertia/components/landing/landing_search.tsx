import { useForm } from '@inertiajs/react'
import { useState } from 'react'
import { useTranslations } from '~/hooks/use_translation.js'
import APISearchbar from '~/components/global/searchbar_api.js'

import Map from '~/assets/map.png'
import Position from '~/assets/position.svg'

export default function LandingSearch() {
  const { t } = useTranslations()

  const { post } = useForm()

  const [place, setPlace] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post(`place/${place}`, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="lg:w-1/2 mt-6 lg:mt-0 flex flex-col items-center">
      <img
        style={{ maxWidth: '100%', height: 'auto' }}
        className="flex mx-auto"
        src={Map}
        alt="Map"
      />
      <APISearchbar
        label={t('place_search')}
        params="place"
        source="/fragments/places"
        state={{ search: place, setSearch: setPlace }}
      />
      <div className="mt-4 w-36 text-black border border-violet-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center space-x-2 transition duration-300">
        <a href="#" className="align-middle no-underline flex items-center space-x-2">
          <img src={Position} className="w-6" alt="Position Icon" />
          <span>Find a place</span>
        </a>
      </div>
    </form>
  )
}
