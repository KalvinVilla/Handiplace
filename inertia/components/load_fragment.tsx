import { usePage } from '@inertiajs/react'
import React, { useEffect, useState, lazy, Suspense } from 'react'

interface FragmentLoaderProps {
  source: string
  fallback?: React.ReactNode
  params: Record<string, any>
  props: Record<string, any>
}

const FragmentLoader: React.FC<FragmentLoaderProps> = ({ source, fallback, params, props }) => {
  const [componentProps, setComponentProps] = useState<any>(null)
  const [Component, setComponent] = useState<React.LazyExoticComponent<any> | null>(null)

  const assetVersion = usePage().version

  useEffect(() => {
    if (Object.values(params).every((value) => value === '')) return

    const timeout = setTimeout(() => {
      const fetchFragment = async () => {
        try {
          const response = await fetch(`${source}?` + new URLSearchParams(params).toString(), {
            headers: {
              'X-Inertia': 'true',
              'X-Inertia-Fragment': 'true',
              'X-Inertia-Version': assetVersion || '',
            },
          }).then((res) => res.json())

          setComponentProps({ ...props, serverProps: response.props })

          const FragmentComponent = lazy(() => import(`../fragments/${response.component}.tsx`))
          setComponent(() => FragmentComponent)
        } catch (error) {
          console.error('error during loading of fragment  :', error)
        }
      }
      fetchFragment()
    }, 500)
    return () => clearTimeout(timeout)
  }, [source, params])

  if (!Component) {
    return <>{fallback}</>
  }

  return (
    <Suspense fallback={fallback}>
      <Component {...componentProps} />
    </Suspense>
  )
}

export default FragmentLoader
