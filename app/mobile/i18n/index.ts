import * as Localization from "expo-localization";
import i18n from "i18next";
import "intl-pluralrules";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import vi from "./vi.json";

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

const initI18n = async () => {
  let savedLanguage = "en"; // Default

  // Basic detection logic - can be improved with async storage to persist user choice
  const locales = Localization.getLocales();
  if (locales && locales.length > 0) {
    const bestLanguage = locales[0].languageCode;
    if (bestLanguage === "vi") {
      savedLanguage = "vi";
    }
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
};

initI18n();

export default i18n;
