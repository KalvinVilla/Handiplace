import { usePage } from '@inertiajs/react'
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  title?: string
  name?: string
  type?: string
  placeholder?: string
  value?: string
  readOnly?: boolean
  disabled?: boolean
  required?: boolean
  className?: string
  ref?: React.Ref<HTMLInputElement>
  labelClassName?: string
  divClassName?: string
  tooltip?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  readOnly,
  ref,
  required,
  className,
  divClassName,
  labelClassName,
  tooltip,
  name,
  ...props
}) => {
  const page = usePage<{ errors?: Record<string, string> }>()
  const error = page.props.errors?.[name ?? ''] ? 'border-red-300' : ''

  const defaultClassName =
    'appearance-none block w-full text-gray-700 border border-gray-400 rounded p-1 leading-tight focus:outline-none focus:border-pink-400 dark:bg-gray-700 dark:text-gray-200 dark:disabled:bg-gray-800 '
  return (
    <div className={`${divClassName ?? 'w-full px-1 mb-3 md:mb-0'}`}>
      <div className="flex">
        <label
          className={`flex items-center uppercase tracking-wide text-xs font-bold mb-1 whitespace-nowrap flex-shrink-0 ${
            labelClassName ?? ''
          }"`}
        >
          {label}{' '}
          {readOnly && label ? (
            <svg
              className="w-4 h-4  ml-1 text-gray-800 dark:text-white"
              aria-hidden="true"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
              />
            </svg>
          ) : (
            ''
          )}{' '}
          {required && label ? <span className=" text-red-600 ml-1">*</span> : ''}
        </label>
      </div>
      <input
        {...props}
        ref={ref}
        name={name}
        required={required}
        autoComplete="none"
        className={`${className ?? defaultClassName} ${readOnly ? 'bg-gray-200 dark:bg-gray-800' : ''} ${error}`}
      />
      <p className="text-red-300">{page.props.errors ? page.props.errors[name] : null}</p>
    </div>
  )
}
