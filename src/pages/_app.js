import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "../../redux/store";
import Navbar from "./home/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}
