import "@/styles/globals.css";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import Spanish from "../languages/es.json";
import English from "../languages/en.json";
import Portugues from "../languages/br.json";
import store from "../../redux/store";

const locale = typeof window !== 'undefined' ? navigator.language : 'es-MX';
let lang;

if (locale === "en") {
  lang = English;
}
if (locale === "br") {
  lang = Portugues;
}
if (locale === "es") {
  lang = Spanish;
}

export default function App({ Component, pageProps }) {
  return (
    <IntlProvider locale={locale} messages={lang} >
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </IntlProvider>
  );
}
