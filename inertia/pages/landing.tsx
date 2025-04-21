import { Head } from '@inertiajs/react'
import Header from '~/components/header.js'
import Divider from '~/components/layout/divider.js'
import Map from '~/assets/map.png'
import Position from '~/assets/position.svg'
import { useState } from 'react'
import AccessibilitySettings from '~/components/global/accessibility_settings.js'
import { useVoiceOver } from '~/hooks/useVoiceOver.js'

export default function LandingPage(props: { version: number }) {

  const [voiceOverEnabled, setVoiceOverEnabled] = useState(false)

  // Active/désactive le voice over
  useVoiceOver(voiceOverEnabled)

  return (
    <>
      <Head title={'Home'} />
      <Header />
      <Divider />

      <AccessibilitySettings onVoiceOverToggle={setVoiceOverEnabled} />

      {/* Home place */}
      <div className="w-11/12 mt-12 mx-auto flex flex-col lg:flex-row">
        <div className="flex flex-col justify-center px-6 lg:px-10 lg:w-1/2">
          <h1 className="text-3xl lg:text-5xl leading-tight font-semibold">
            Trouvez des activités avec
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 inline-block text-transparent bg-clip-text">
              accès pour personnes handicapées
            </span>
          </h1>
          <p className="text-gray-600 mt-4">
            Avec ce site web, vous trouverez tous les lieux avec accès pour personnes handicapées,
            afin de pouvoir obtenir des informations sans vous rendre sur place.
          </p>
        </div>
        <div className="lg:w-1/2 mt-6 lg:mt-0 flex flex-col items-center">
          <img
            style={{ maxWidth: '100%', height: 'auto' }}
            className="flex mx-auto"
            src={Map}
            alt="Map"
          />
          <div className="mt-4 w-36 text-black border border-violet-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center space-x-2 transition duration-300">
            <a href="#" className="align-middle no-underline flex items-center space-x-2">
              <img src={Position} className="w-6" alt="Position Icon" />
              <span>Find a place</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
