import "@/styles/globals.css";
import { Provider, useDispatch } from "react-redux";
import store from "../../redux/store";
import LanguageProvider from "@/languages/LanguageProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import { onPageLoad } from "../../utils/verificationIP";
import UserProvider from "../../redux/UserProvider"; // Setea en Redux los datos del usuario

export default function App({ Component, pageProps }) {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <LanguageProvider>
        <Provider store={store}>
          <UserProvider> 
            <Navbar />
            <Component {...pageProps} />
          </UserProvider>
        </Provider>
      </LanguageProvider>
    </>
  );
}
