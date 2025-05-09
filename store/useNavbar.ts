import { useAuthStore } from '~/store/auth';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useLocaleRoute } from "#i18n";

export const useNavbar = () => {
    const authStore = useAuthStore();
    const router = useRouter();
    const { t, locale } = useI18n();
    const localeRoute = useLocaleRoute();

    const navigationItems = [
        { to: '/', label: t('Home') },
        { to: '/product/dashboard', label: t('Products') },
        { to: '/quotations/create', label: t('Quotations') },
    ];

    // Watch for locale changes and update the navigation items accordingly
    watch(() => locale.value, () => {
        navigationItems.value = [
            { to: localeRoute('/'), label: t('Home') },
            { to: localeRoute('/product/dashboard'), label: t('Products') },
            { to: localeRoute('/quotations/create'), label: t('Quotations') },
        ];
    });

    const signIn = () => {
        const route = `/${locale.value}/auth/login`; // Construct the route with the locale
        router.push(route).then(r => {});
    };

    const signOut = () => {
        authStore.logout();
        const route = `/${locale.value}/auth/login`; // Construct the route with the locale
        router.push(route).then(r => {});
    };

    return {
        navigationItems,
        signIn,
        signOut,
    };
};
