import React, { useContext, useEffect } from "react";

import { LanguageContext } from "@/languages/LanguageProvider";

const SetIdiomas = () => {
  const { locale, setLocale } = useContext(LanguageContext);

  
  const handleLocaleChange = (e) => {
    setLocale(e.target.value);
    localStorage.setItem("locale", e.target.value)
  };
  

  const languages = [
    { value: null, label: "-" },
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "pt", label: "Portugues" },
  ];

  return (
    <div>
      <select value={locale} onChange={handleLocaleChange}>
        {languages.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SetIdiomas;
