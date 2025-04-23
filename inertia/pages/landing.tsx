import { Head, router, usePage } from '@inertiajs/react'
import Header from '~/components/header.js'
import Divider from '~/components/layout/divider.js'
import { lazy, Suspense, useState } from 'react'
import AccessibilitySettings from '~/components/global/accessibility_settings.js'
import { useVoiceOver } from '~/hooks/useVoiceOver.js'
import LandingDescription from '~/components/landing/landing_description.js'
import LandingSearch from '~/components/landing/landing_search.js'

// const DynamicMap = lazy(() => import('~/components/map/map.client'))

export default function LandingPage() {
  const { topPlaces } = usePage().props

  console.log(topPlaces)

  const [voiceOverEnabled, setVoiceOverEnabled] = useState(false)

  // Active/désactive le voice over
  useVoiceOver(voiceOverEnabled)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Head title={'Home'} />
      <Header />
      <Divider />

      <AccessibilitySettings onVoiceOverToggle={setVoiceOverEnabled} />

      {/* Home place */}
      <div className="w-11/12 mt-12 mx-auto flex flex-col lg:flex-row">
        <LandingDescription />
        <LandingSearch />
      </div>

      {/* Top places */}
      <div className="w-11/12 mt-12 mx-auto flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Top des lieux</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {topPlaces && topPlaces.length > 0 ? (
            topPlaces.map((place: any, index: any) => (
              <div
                key={index}
                onClick={() => {
                  router.get(`place/${place.id}`, {
                    preserveState: true,
                    preserveScroll: true,
                  })
                }}
                className="min-w-[200px] flex-shrink-0 bg-white rounded-2xl shadow-md p-4"
              >
                {/* Si tu as une image, tu peux ajouter ici */}
                {place.image && (
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-32 object-cover rounded-xl mb-2"
                  />
                )}
                <h3 className="text-lg font-semibold text-center">{place.name}</h3>
                <p className="text-center text-gray-600 mt-1">Note : {place.rating ?? 'N/A'}/100</p>
              </div>
            ))
          ) : (
            <p>Aucun lieu populaire pour l’instant.</p>
          )}
        </div>
      </div>

      {/* <div>
        <h1 className="text-3xl lg:text-5xl leading-tight font-semibold text-center mt-12">
          Explorez le monde avec nous
        </h1>
        <p className="text-gray-600 mt-4 text-center">
          Découvrez les meilleures destinations et trouvez votre prochaine aventure.
        </p>
        <div className="flex justify-center mt-8 p-8">
          <Suspense fallback={<div>Chargement de la carte...</div>}>
            <DynamicMap />
          </Suspense>
        </div>
      </div> */}
    </div>
  )
}
