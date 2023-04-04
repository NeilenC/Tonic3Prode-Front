import "@/styles/globals.css";
//import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
// import Spanish from "../languages/es.json";
// import English from "../languages/en.json";
// import Portugues from "../languages/br.json";
import store from "../../redux/store";
//import { getGeoLocation } from "../../utils/geolocation";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";

export default function App({ Component, pageProps }) {
  // const locale = typeof window !== "undefined" ? navigator.language : "es";
  // let lang;

  // if (locale === "en") {
  //   lang = English;
  // } else {
  //   if (locale === "pt") {
  //     lang = Portugues;
  //   } else {
  //     lang = Spanish;
  //   }
  // }

  // if (typeof window !== "undefined") {
  //   getGeoLocation();
  // }

  return (
    <>
      <div>
        <Toaster />
      </div>
      {/* <IntlProvider locale={locale} messages={lang}> */}
        <Provider store={store}>
          <Navbar />
          <Component {...pageProps} />
        </Provider>
      {/* </IntlProvider> */}
    </>
  );
}
