import { useState } from 'react'
import FragmentLoader from '~/components/load_fragment.js'
import { Input } from '~/components/ui/input.js'

interface SearchbarProps {
  label: string
  source: string
  params: string
  required?: boolean
  disabled?: boolean
  state: { search: string; setSearch: (value: string) => void }
}

export default function APISearchbar({
  label,
  required,
  disabled,
  source,
  params,
  state,
}: SearchbarProps) {
  const [selected, setSelected] = useState<boolean>(false)

  const Loader = () => {
    return (
      <div className="absolute right-3 top-6">
        <svg className="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <radialGradient
            id="a11"
            cx=".66"
            fx=".66"
            cy=".3125"
            fy=".3125"
            gradientTransform="scale(1.5)"
          >
            <stop offset="0" stopColor="#4A26FF"></stop>
            <stop offset=".3" stopColor="#4A26FF" stopOpacity=".9"></stop>
            <stop offset=".6" stopColor="#4A26FF" stopOpacity=".6"></stop>
            <stop offset=".8" stopColor="#4A26FF" stopOpacity=".3"></stop>
            <stop offset="1" stopColor="#4A26FF" stopOpacity="0"></stop>
          </radialGradient>
          <circle
            fill="none"
            stroke="url(#a11)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="200 1000"
            strokeDashoffset="0"
            cx="100"
            cy="100"
            r="70"
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="1"
              values="360;0"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
          <circle
            fill="none"
            opacity=".2"
            stroke="#4A26FF"
            strokeWidth="2"
            strokeLinecap="round"
            cx="100"
            cy="100"
            r="70"
          ></circle>
        </svg>
      </div>
    )
  }

  return (
    <div
      className="relative flex flex-col w-full px-1 mb-3 md:mb-0"
      onBlur={() => setTimeout(() => setSelected(false), 200)}
      onFocus={() => {
        setSelected(true)
      }}
    >
      <Input
        type="text"
        required={required}
        disabled={disabled}
        onChange={(e) => state.setSearch(e.target.value)}
        label={label}
        value={state.search}
        placeholder="Search"
      />
      {selected && (
        <div className="relative w-auto h-auto">
          <FragmentLoader
            source={source}
            params={{ [params]: state.search }}
            fallback={<Loader />}
            props={{ onSelect: (value: string) => state.setSearch(value) }}
          />
        </div>
      )}
    </div>
  )
}
