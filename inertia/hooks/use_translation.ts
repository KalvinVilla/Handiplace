import { router, usePage } from '@inertiajs/react'

interface Translations {
  [key: string]: string
}

export type Language = 'fr' | 'en'

interface PageProps {
  [key: string]: any
  translations: Translations
}

export function useTranslations() {
  const { props } = usePage<PageProps>()
  const currentLocale = props.locale || 'fr'

  const translations = props.translations || {}

  const changeLanguage = (newLang: Language) => {
    console.log(`Changing language to ${newLang}`)
    router.post('/lang', { locale: newLang })
  }

  return {
    changeLanguage,
    currentLocale,
    t: (key: string) => translations[key] || key,
  }
}
