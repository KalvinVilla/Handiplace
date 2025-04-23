import React from 'react'

interface UserFragmentProps {
  onSelect: (user: string) => void
  serverProps: { places: any[] }
}

const UserFragment: React.FC<UserFragmentProps> = ({ onSelect, serverProps }) => {
  return (
    <ul className="absolute dark:bg-gray-900 bg-white dark:text-white w-full user-list max-h-28 overflow-y-auto shadow-lg rounded-md z-10">
      {serverProps.places.map((place: any) => (
        <li
          key={place.name}
          className="user-item cursor-pointer p-2 hover:bg-gray-200 dark:text-white mx-2 hover:text-black"
          onClick={() => onSelect(place.name)}
        >
          {place.name}
        </li>
      ))}
    </ul>
  )
}

export default UserFragment
