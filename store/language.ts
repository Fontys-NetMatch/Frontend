import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export const useLanguage = () => {
    type LanguageCode = 'en' | 'fr' | 'de' | 'nl';

    const languages = ref([
        { code: 'en', name: 'English', flag: 'assets/images/flags/en.png' },
        { code: 'fr', name: 'Français', flag: 'assets/images/flags/fr.png' },
        { code: 'de', name: 'Deutsch', flag: 'assets/images/flags/de.png' },
        { code: 'nl', name: 'Nederlands', flag: 'assets/images/flags/nl.png' },
    ]);

    const { locale } = useI18n();
    const router = useRouter();

    const selectedLanguage = ref(
        languages.value.find((lang) => lang.code === locale.value) || languages.value[0]
    );

    const changeLanguage = (langCode: LanguageCode) => {
        locale.value = langCode;
        selectedLanguage.value =
            languages.value.find((lang) => lang.code === langCode) || languages.value[0];

        // ✅ Get the current route
        const currentRoute = router.currentRoute.value;
        let newPath = currentRoute.path;

        // ✅ Remove any existing language prefix ("/nl/", "/fr/", etc.)
        newPath = newPath.replace(/^\/(nl|fr|de)\//, '/');

        // ✅ Add the new language prefix, unless it's English (default)
        if (langCode !== 'en') {
            newPath = `/${langCode}${newPath}`;
        }

        // ✅ Navigate to the new path
        router.push(newPath);
    };

    return {
        languages,
        selectedLanguage,
        changeLanguage,
    };
};
