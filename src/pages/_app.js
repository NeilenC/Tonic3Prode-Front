import "@/styles/globals.css";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import Spanish from "../languages/es.json";
import English from "../languages/en.json";
import Portugues from "../languages/br.json";
import store from "../../redux/store";


export default function App({ Component, pageProps }) {

  const locale = typeof window !== 'undefined' ? navigator.language : 'es';
  let lang;
  
  if (locale === "en") {
    lang = English;
  } else {

    if (locale === "br") {
      lang = Portugues;
    } else {
      lang = Spanish;
    }
  }


  return (
    <IntlProvider locale={locale} messages={lang} >
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </IntlProvider>
  );
}
