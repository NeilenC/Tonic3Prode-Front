import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import LanguageProvider from "@/languages/LanguageProvider";

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
