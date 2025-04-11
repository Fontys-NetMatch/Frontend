import en from "./locale/en.json"
import fr from "./locale/fr.json"
import nl from "./locale/nl.json"
import de from "./locale/de.json"

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
