import { useState } from "react";

export default function AccessibilitySettings({ onVoiceOverToggle }: { onVoiceOverToggle: (enabled: boolean) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceOverEnabled, setVoiceOverEnabled] = useState(false)

  const toggleVoiceOver = () => {
    const newState = !voiceOverEnabled
    setVoiceOverEnabled(newState)
    onVoiceOverToggle(newState) // Communique à l'extérieur
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ouvrir les options d'accessibilité"
      >
        ⚙️
      </button>

      {isOpen && (
        <div className="mt-2 w-72 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
            Accessibilité
          </h2>

          <div className="flex flex-col gap-3">
            {/* Thème */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Thème
              </label>
              <select className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                <option value="light">Clair</option>
                <option value="dark">Sombre</option>
              </select>
            </div>

            {/* Taille de police */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Taille du texte
              </label>
              <select className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                <option value="normal">Normale</option>
                <option value="large">Grande</option>
                <option value="x-large">Très grande</option>
              </select>
            </div>

            {/* Langue */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Langue
              </label>
              <select className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                <option value="fr">Français</option>
                <option value="en">Anglais</option>
              </select>
            </div>

            {/* VoiceOver */}
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Voice Over
              </span>
              <button
              onClick={toggleVoiceOver}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {voiceOverEnabled ? "Désactiver" : "Activer"}
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
