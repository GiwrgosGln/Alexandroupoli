import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

// Import your translation files
import el from "./locales/el";
import en from "./locales/en";

const i18n = new I18n({
  en,
  el,
});

// Set the locale once at the beginning of your app.
// getLocales() returns an array, the first one is the primary language.
i18n.locale = getLocales()[0].languageCode ?? "en";

// Enable fallback if you want 'en' translations for missing keys in other languages.
i18n.enableFallback = true;

export default i18n;
