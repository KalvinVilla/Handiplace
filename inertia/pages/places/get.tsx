import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaParking,
  FaBus,
  FaWheelchair,
  FaToilet,
} from 'react-icons/fa'
import { Head, usePage } from '@inertiajs/react'
import Header from '~/components/header.js'
import Divider from '~/components/layout/divider.js'

function renderStars(rating: number) {
  const stars = []
  const score = (rating ?? 0) / 20

  for (let i = 1; i <= 5; i++) {
    if (score >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400" />)
    } else if (score >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />)
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />)
    }
  }
  return <div className="flex">{stars}</div>
}

export default function PlaceDetails() {
  const { place } = usePage<{ place: any }>().props

  if (!place) return <div>Chargement...</div>

  return (
    <>
      <Head title={'Home'} />
      <Header />
      <Divider />
      <div className="w-11/12 max-w-5xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg">
        {/* Image */}
        {place.image && (
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
        )}

        {/* Name and Stars */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h1 className="text-3xl font-bold">{place.name}</h1>
          <div className="mt-2 md:mt-0"> {renderStars(place.rating)}</div>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-6">{place.description}</p>

        {/* Address */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Adresse</h2>
          <p>{place.address}</p>
          <p>
            {place.postal_code} {place.city}, {place.country}
          </p>
        </div>

        {/* Informations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            {place.website && (
              <p>
                <a
                  href={place.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Site web
                </a>
              </p>
            )}
            {place.phone && (
              <p>
                <a href={`tel:${place.phone}`} className="text-blue-600 hover:underline">
                  {place.phone}
                </a>
              </p>
            )}
            {place.email && (
              <p>
                <a href={`mailto:${place.email}`} className="text-blue-600 hover:underline">
                  {place.email}
                </a>
              </p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Accessibilité</h2>
            <div className="flex flex-wrap gap-2">
              {place.parking && (
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                  <FaParking /> Parking
                </span>
              )}
              {place.disabled_parking && (
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                  <FaWheelchair /> Parking PMR
                </span>
              )}
              {place.public_transport && (
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                  <FaBus /> Transport public
                </span>
              )}
              {place.access_ramp && (
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                  <FaWheelchair /> Rampe d'accès
                </span>
              )}
              {place.disabled_toilet && (
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                  <FaToilet /> Toilettes PMR
                </span>
              )}
              {place.elevator && (
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                  Ascenseur
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tags */}
        {place.tags && place.tags.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {place.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Comments */}
        {place.comments && place.comments.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Commentaires</h2>
            <div className="space-y-4">
              {place.comments.map((comment, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{comment.user}</span>
                    <div>{renderStars(comment.rating)}</div>
                  </div>
                  <p className="text-gray-700">{comment.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
