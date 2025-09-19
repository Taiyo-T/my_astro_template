import ja from "./ja.json";
import en from "./en.json";
import ar from "./ar.json";

export const ALL_LOCALES = ["ja", "en", "ar"] as const;
export type Locale = typeof ALL_LOCALES[number];

// デフォルト言語
export const DEFAULT_LOCALE: Locale = "ja";

// 言語ごとのメタデータ
export const LOCALE_DATA: Record<Locale, { name: string; direction: "ltr" | "rtl" }> = {
    ja: { name: "日本語", direction: "ltr" },
    en: { name: "English", direction: "ltr" },
    ar: { name: "العربية", direction: "rtl" },
};

// 翻訳オブジェクト
export const translationsMap: Record<Locale, typeof ja> = {
    ja,
    en,
    ar,
};

// ユーティリティ関数
export function getTranslations(locale: Locale): typeof ja {
    return translationsMap[locale] || translationsMap[DEFAULT_LOCALE];
}

export function isValidLocale(locale: string): locale is Locale {
    return ALL_LOCALES.includes(locale as Locale);
}

export function getLocalePath(locale: Locale, path: string = ""): string {
    if (locale === DEFAULT_LOCALE) {
        return `/${path}`.replace(/\/+/g, "/").replace(/\/$/, "") || "/";
    }
    return `/${locale}/${path}`.replace(/\/+/g, "/").replace(/\/$/, "") || `/${locale}`;
}

// ページ固有の翻訳を読み込む関数
export async function getPageTranslations(locale: Locale, pageName: string): Promise<any> {
    try {
        const pageTranslations = await import(`./pages/${pageName}.${locale}.json`);
        return pageTranslations.default;
    } catch (error) {
        console.warn(`Page translations not found for ${pageName}.${locale}.json, falling back to default`);
        try {
            const defaultPageTranslations = await import(`./pages/${pageName}.${DEFAULT_LOCALE}.json`);
            return defaultPageTranslations.default;
        } catch (fallbackError) {
            console.error(`Could not load page translations for ${pageName}`);
            return {};
        }
    }
}
