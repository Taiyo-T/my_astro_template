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
        // newsページの場合はblogの翻訳ファイルを使用
        const translationPageName = pageName === "news" ? "blog" : pageName;
        const pageTranslations = await import(`./pages/${translationPageName}.${locale}.json`);
        return pageTranslations.default;
    } catch (error) {
        console.warn(`Page translations not found for ${pageName}.${locale}.json, falling back to default`);
        try {
            const translationPageName = pageName === "news" ? "blog" : pageName;
            const defaultPageTranslations = await import(`./pages/${translationPageName}.${DEFAULT_LOCALE}.json`);
            return defaultPageTranslations.default;
        } catch (fallbackError) {
            console.error(`Could not load page translations for ${pageName}`);
            return {};
        }
    }
}

// クッキー操作の関数
export const LANGUAGE_COOKIE_NAME = "preferred_language";

export function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
    }
    return null;
}

export function setCookie(name: string, value: string, days: number = 365): void {
    if (typeof document === "undefined") return;
    
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

// ブラウザの言語設定から対応言語を検出
export function detectBrowserLanguage(): Locale {
    if (typeof navigator === "undefined") return DEFAULT_LOCALE;
    
    // navigator.language または navigator.languages から検出
    const browserLanguages = [
        navigator.language,
        ...(navigator.languages || [])
    ];
    
    for (const browserLang of browserLanguages) {
        // 完全一致を確認 (例: "ja", "en", "ar")
        if (isValidLocale(browserLang)) {
            return browserLang;
        }
        
        // 言語コードの前半部分をチェック (例: "ja-JP" -> "ja")
        const langCode = browserLang.split('-')[0];
        if (isValidLocale(langCode)) {
            return langCode;
        }
    }
    
    return DEFAULT_LOCALE;
}

// 保存された言語設定を取得
export function getSavedLanguage(): Locale | null {
    const saved = getCookie(LANGUAGE_COOKIE_NAME);
    return saved && isValidLocale(saved) ? saved : null;
}

// 言語設定を保存
export function saveLanguage(locale: Locale): void {
    setCookie(LANGUAGE_COOKIE_NAME, locale);
}

// 最適な言語を決定（優先度: 保存された設定 > ブラウザ言語 > デフォルト）
export function getPreferredLanguage(): Locale {
    // 1. 保存された言語設定
    const saved = getSavedLanguage();
    if (saved) return saved;
    
    // 2. ブラウザの言語設定
    return detectBrowserLanguage();
}
