import en from "./locale/en"
import fr from "./locale/fr"
import nl from "./locale/nl"
import de from "./locale/de"
export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en,
        fr,
        nl,
        de
    }
  }))  