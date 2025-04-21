import { useEffect, useState } from 'react'

export function useVoiceOver(isEnabled: boolean) {
  const [hoverElement, setHoverElement] = useState<HTMLElement | null>(null)
  const [hoverTimeout, setHoverTimeout] = useState<number | null>(null)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)

  // Définir ici les fonctions
  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    if (selectedVoice) {
      utterance.voice = selectedVoice
    }
    window.speechSynthesis.speak(utterance)
  }

  const loadVoices = () => {
    const allVoices = window.speechSynthesis.getVoices()
    setVoices(allVoices)
    const preferredVoice = allVoices.find(
      (voice) => voice.name.includes('Google') && voice.lang.includes('fr')
    )
    setSelectedVoice(preferredVoice ?? null)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isEnabled) return

    const element = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement

    if (element && ['H1', 'H2', 'P'].includes(element.tagName)) {
      if (hoverElement !== element) {
        if (hoverTimeout) {
          clearTimeout(hoverTimeout)
        }
        const timeout = setTimeout(() => {
          console.log('Speak:', element.textContent)
          if (element.textContent) speakText(element.textContent)
        }, 500)
        setHoverTimeout(timeout)
      }
      setHoverElement(element)
    } else {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
      setHoverElement(null)
      window.speechSynthesis.cancel()
    }
  }

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = loadVoices
    loadVoices()

    if (isEnabled) {
      document.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [isEnabled, hoverElement, hoverTimeout, selectedVoice])
}
