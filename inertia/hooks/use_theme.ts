import { useState, useEffect, useCallback } from 'react'

const THEME_KEY = 'theme'

export type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(THEME_KEY) as Theme) || 'light'
    }
    return 'light'
  })

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')
    root.classList.add(newTheme)

    localStorage.setItem(THEME_KEY, newTheme)
  }, [])

  const changeTheme = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme)
      applyTheme(newTheme)
    },
    [applyTheme]
  )

  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])

  return { theme, changeTheme }
}
