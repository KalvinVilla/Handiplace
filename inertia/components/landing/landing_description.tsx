import { useTranslations } from '~/hooks/use_translation.js'

export default function LandingDescription() {
  const { t } = useTranslations()

  return (
    <div className="flex flex-col justify-center px-6 lg:px-10 lg:w-1/2">
      <h1 className="text-3xl lg:text-5xl leading-tight font-semibold dark:text-white ">
        {t('title_1')}
        <span className="text-red">
          {/* className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 inline-block text-transparent bg-clip-text" */}
          {t('title_2')}
        </span>
      </h1>
      <p className="text-gray-600 dark:text-white  mt-4">{t('description')}</p>
    </div>
  )
}
