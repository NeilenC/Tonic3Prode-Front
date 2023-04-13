import React, { createContext, useState, useEffect } from "react";
import Spanish from "./es.json";
import English from "./en.json";
import Portugues from "./pt.json";
import { IntlProvider } from "react-intl";
export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("");
  const [locale, setLocale] = useState("es");

  useEffect(() => {

    if (typeof window !== "undefined") {
      setLocale(navigator.language);
    } else {
      setLocale("es-MX");
    }
  }, []);

  useEffect(() => {
    let selectedLanguage = locale;
    const localStorageLang = localStorage.getItem("locale", locale);
    if (localStorageLang) {
      selectedLanguage = localStorageLang; 
    }

    if (selectedLanguage.includes("en")) {
      setLanguage(English);
    } else if (selectedLanguage.includes("pt")) {
      setLanguage(Portugues);
    } else if (selectedLanguage.includes("es")){
      setLanguage(Spanish);
    }
  }, [locale]);



  function ErrorFunction(error, message) {
    console.warn(`Error al obtener el mensaje ${message}: ${error.message}`);
    return message;
  }
  
  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      <IntlProvider onError={ErrorFunction} locale={locale} messages={language}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
