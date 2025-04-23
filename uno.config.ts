import presetWind4 from '@unocss/preset-wind4'
import presetTypography from '@unocss/preset-typography'
import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [presetWind4(), presetTypography(), presetAttributify(), presetIcons()],
  theme: {
    extend: {
      fontSize: {
        'normal': '1rem', // text-normal
        'large': '1.25rem', // text-large
        'x-large': '1.5rem', // text-x-large
      },
    },
    colors: {
      primary: {
        50: '#f5f3ff',
        100: '#ede9fe',
        200: '#ddd6fe',
        300: '#c4b5fd',
        400: '#a78bfa',
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
        800: '#5b21b6',
        900: '#4c1d95',
      },
      secondary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
    },
  },
})
