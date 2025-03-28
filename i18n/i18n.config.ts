import en from "./locale/en"
import fr from "./locale/fr"
import nl from "./locale/nl"
import de from "./locale/de"

export default defineI18nConfig(() => ({
    legacy: false, // Use Composition API-based i18n
    locale: 'en', // Default locale
    fallbackLocale: 'en', // Fallback language in case of missing translations
    strategy: 'prefix_and_default', // Adds language prefixes (e.g., /en, /de, /fr)
    messages: {
        en,
        fr,
        nl,
        de,
    },
}))
