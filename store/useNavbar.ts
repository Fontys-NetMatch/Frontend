import { ref } from 'vue';
import { useAuthStore } from '~/store/auth';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export const useNavbar = () => {
    const authStore = useAuthStore();
    const router = useRouter();

    const navigationItems = [
        { label: 'Home', to: '/' },
        { label: 'Products', to: '/product/dashboard' },
        { label: 'Quotations', to: '/quotations/dashboard' },
    ];

    const signIn = () => {
        router.push('/auth/login');
    };

    const signOut = () => {
        authStore.logout();
        router.push('/auth/login');
    };

    type LanguageCode = 'en' | 'fr' | 'de' | 'nl';

    const languages = ref([
        { code: 'en', name: 'English', flag: 'assets/images/flags/en.png' },
        { code: 'fr', name: 'France', flag: 'assets/images/flags/fr.png' },
        { code: 'de', name: 'Deutsch', flag: 'assets/images/flags/de.png' },
        { code: 'nl', name: 'Nederlands', flag: 'assets/images/flags/nl.png' },
    ]);

    const { locale } = useI18n();

    const selectedLanguage = ref(
        languages.value.find((lang) => lang.code === locale.value) || languages.value[0]
    );

    const changeLanguage = (langCode: LanguageCode) => {
        locale.value = langCode;
        selectedLanguage.value =
            languages.value.find((lang) => lang.code === langCode) || languages.value[0];
    };


    return {
        navigationItems,
        signIn,
        signOut,
        languages,
        selectedLanguage,
        changeLanguage,
    };
};
