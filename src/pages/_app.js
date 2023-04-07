import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "../../redux/store";
import LanguageProvider from "@/languages/LanguageProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import { onPageLoad } from "../../utils/verificationIP"; 

export default function App({ Component, pageProps }) {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <LanguageProvider>
        <Provider store={store}>
          <Navbar />
          <Component {...pageProps} />
        </Provider>
      </LanguageProvider>
    </>
  );
}
