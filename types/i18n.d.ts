// types/i18n.d.ts
export interface LocaleObject {
    code: string;
    iso: string;
    name: string;
    file: string;
}

export interface I18nPlugin {
    setLocales: (locales: LocaleObject[]) => void;
    setPages: (pages: Record<string, Record<string, string>>) => void;
}

// Nuxt 3 plugin injection
declare module '#app' {
    interface NuxtApp {
        $i18n: I18nPlugin;
    }
}

declare module 'nuxt/schema' {
    interface NuxtAppConfig {
        $i18n: I18nPlugin;
    }
}

export {};
