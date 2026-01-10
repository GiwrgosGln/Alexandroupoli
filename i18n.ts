import * as Localization from "expo-localization";
import i18n from "i18next";
import "intl-pluralrules";
import { initReactI18next } from "react-i18next";

// Import translation files
import el from "./locales/el.json";
import en from "./locales/en.json";

const RESOURCES = {
  en: { translation: en },
  el: { translation: el },
};

i18n.use(initReactI18next).init({
  resources: RESOURCES,
  fallbackLng: "en",
  lng: Localization.getLocales()[0]?.languageCode ?? "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
