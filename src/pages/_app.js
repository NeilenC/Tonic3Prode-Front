import "@/styles/globals.css";
import { Provider, useDispatch } from "react-redux";
import store from "../../redux/store";
import LanguageProvider from "@/languages/LanguageProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import { onPageLoad } from "../../utils/verificationIP";
import UserProvider from "../../redux/UserProvider"; // Setea en Redux los datos del usuario
import LayOut from "@/commons/LayOut";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
      <LanguageProvider>
        <Provider store={store}>
          <UserProvider>
            <LayOut>
              <Component {...pageProps} />
            </LayOut>
          </UserProvider>
        </Provider>
      </LanguageProvider>
    </>
  );
}
