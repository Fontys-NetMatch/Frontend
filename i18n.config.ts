// i18n.config.ts
export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            common: () => import('~/i18n/locale/en/common.json'),
            auth: () => import('~/i18n/locale/en/auth/login.json'),
            dashboard: () => import('~/i18n/locale/en/dashboard/index.json')
        },
        fr: {
            common: () => import('~/i18n/locale/fr/common.json'),
            auth: () => import('~/i18n/locale/fr/auth/login.json'),
            dashboard: () => import('~/i18n/locale/fr/dashboard/index.json')
        }
    }
}));
