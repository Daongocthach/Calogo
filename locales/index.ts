import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import useStore from "@/store";

import DATA_CN from "./cn/data.json";
import DATA_EN from "./en/data.json";
import DATA_VI from "./vi/data.json";

export const defaultNS = "data";

export const resources = {
  cn: {
    data: DATA_CN,
  },
  en: {
    data: DATA_EN,
  },
  vi: {
    data: DATA_VI,
  },
};

const lng = useStore.getState().currentLanguage

i18next.use(initReactI18next).init({
  lng,
  resources,
  defaultNS,
  ns: ["data"],
  fallbackLng: "en",
  supportedLngs: ["cn", "en", "vi"],
  
  interpolation: { escapeValue: false },
});

export default i18next;