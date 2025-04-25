import { ref } from 'vue';
import { useAuthStore } from '~/store/auth';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useLocaleRoute } from '#i18n';

export const useNavbar = () => {
    const authStore = useAuthStore();
    const router = useRouter();

    const { t , locale } = useI18n(); // Use useI18n within setup or hook context
    const localeRoute = useLocaleRoute();


    const navigationItems = ref([
        { to: localeRoute('/'), label: t('Home') },
        { to: localeRoute('/product/dashboard'), label: t('Products') },
        { to: localeRoute('/quotations'), label: t('Quotations') },
    ]);

    // Watch for locale changes and update the navigation items accordingly
    watch(() => locale.value, () => {
        navigationItems.value = [
            { to: localeRoute('/'), label: t('Home') },
            { to: localeRoute('/product/dashboard'), label: t('Products') },
            { to: localeRoute('/quotations'), label: t('Quotations') },
        ];
    });

    const signIn = () => {
        const { locale } = useI18n(); // Get the current locale
        const route = `/${locale.value}/auth/login`; // Construct the route with the locale
        router.push(route);
    };

    const signOut = () => {
        authStore.logout();
        const { locale } = useI18n(); // Get the current locale
        const route = `/${locale.value}/auth/login`; // Construct the route with the locale
        router.push(route);
    };



    return {
        navigationItems,
        signIn,
        signOut,
    };
};
