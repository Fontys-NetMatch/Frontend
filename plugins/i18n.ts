import { createI18n } from 'vue-i18n';

export default defineNuxtPlugin(async (nuxtApp) => {
    const files = import.meta.glob('~/i18n/locale/**/**/*.json');
    const messages = {};

    for (const path in files) {
        const module = await files[path]();
        const parts = path.split('/');
        const langIndex = parts.indexOf('locale') + 1;

        const lang = parts[langIndex];
        const section = parts[langIndex + 1];
        const keyFile = parts[langIndex + 2];
        const key = keyFile?.replace('.json', '');

        if (!lang || !section || !key) {
            console.warn(`⚠️ Skipping invalid i18n file path: ${path}`);
            continue;
        }

        messages[lang] ??= {};
        messages[lang][section] ??= {};
        messages[lang][section][key] = module.default;
    }

    const i18n = createI18n({
        legacy: false,
        locale: 'en',
        fallbackLocale: 'en',
        messages,
    });

    nuxtApp.vueApp.use(i18n);
});
