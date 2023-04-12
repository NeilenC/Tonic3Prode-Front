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
      setLocale("es");
    }
  }, []);

  useEffect(() => {
    let selectedLanguage = locale;
    const localStorageLang = localStorage.getItem("locale", locale);
    if (localStorageLang) {
      selectedLanguage = localStorageLang; 
      console.log(selectedLanguage, "SELECTEDLANG");
    }

    if (selectedLanguage.includes("en")) {
      setLanguage(English);
    } else if (selectedLanguage.includes("pt")) {
      setLanguage(Portugues);
    } else if (selectedLanguage.includes("es")){
      setLanguage(Spanish);
    }
  }, [locale]);

  // useEffect(() => {
  //   let selectedLanguage = locale;
  //   const localStorageLang = localStorage.getItem("locale", locale);
  //   if (localStorageLang) {
  //     selectedLanguage = localStorageLang;
  //     console.log(selectedLanguage, "SELECTEDLANG");

  //   } else {
  //     if (selectedLanguage.includes("en")) {
  //       setLanguage(English);
  //     } else if (selectedLanguage.includes("pt")) {
  //       setLanguage(Portugues);
  //     } else if (selectedLanguage.includes("es")) {
  //       setLanguage(Spanish);
  //     }
  //   }
  // }, [locale]);

  function ErrorFunction(error, message) {
    console.warn(`Error al obtener el mensaje ${message}: ${error.message}`);
    return message;
  }

  // const handleLocaleChange = (e) => {
  //   const selectedLocale = e.target.value;
  //   setLocale(selectedLocale);
  //   localStorage.setItem("locale", selectedLocale); // almacena el valor en el localStorage
  // };

  // useEffect(() => {
  //   if (typeof window !== "undefined") { // Verifica si se está ejecutando en el navegador
  //     const storedLocale = localStorage.getItem("locale");
  //     setLocale(storedLocale || "es");
  //   }
  // }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      <IntlProvider onError={ErrorFunction} locale={locale} messages={language}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
