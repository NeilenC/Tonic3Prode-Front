import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { providerGoogle } from "./firebaseConfig";
import axios from "axios";
import toast from "react-hot-toast";
import { setFirstLogin } from "../redux/reducers/firstLogin";
import { setUid } from "../redux/reducers/uid";
import { setUserInfo } from "../redux/reducers/userInfo";
import { getGeolocationByIp, getVisitorIP } from "../utils/verificationIP";

export const signUpGoogle = async (auth, dispatch) => {
  try {
    const res = await signInWithPopup(auth, providerGoogle);
    const userFirebase = await new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => resolve(user));
    });

    console.log("USERF", userFirebase);

    const users = await axios.get("http://localhost:3001/api/users");
    localStorage.setItem("uid", userFirebase.uid);

    // Obtener la dirección IP del usuario
    const ip = await getVisitorIP();

    // Obtener el país del usuario a partir de su IP
    const country = await getGeolocationByIp(ip);

    console.log("COUNTRY", country);

    // Validar que el usuario esté en un país permitido
    if (
      country === "Argentina" ||
      country === "Brazil" ||
      country === "United States"
    ) {
      toast.success(
        `Congratulations, since your are from ${country}, you can log into our app!`
      );
      const users = await axios.get("http://localhost:3001/api/users");
      localStorage.setItem("uid", userFirebase.uid);
      dispatch(
        setUserInfo({
          email: userFirebase.email,
          fullName: userFirebase.displayName,
          country: country,
        })
      );
      const userMongoDB = users.data.filter(
        (user) => user.uid === userFirebase.uid
      );
      console.log("USERM", userMongoDB);

      if (userMongoDB.length > 0) {
        dispatch(setFirstLogin(false));
        toast.success("Please verify your phone number!");
        window.location.href = "http://localhost:3000/logIn/TwoFactorAuth";
      } else {
        dispatch(setFirstLogin(true));
        dispatch(
          setUserInfo({
            email: userFirebase.email,
            username: userFirebase.displayName,
            country: country,
          })
        );
        toast.error(
          "User not found in database. Please complete the login form."
        );
      }
    } else {
      // Si el usuario no está en un país permitido, mostrar un mensaje de error
      toast.error(
        "Sorry, this service is only available in Argentina, Brazil or United States"
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const logOut = (auth) => {
  signOut(auth);
};

export const changeHour = (hour) => {
  let hours = Math.floor(hour / 100);
  let minutes = hour % 100;
  return hours + ":" + (minutes < 10 ? "0" : "") + minutes;
};

export const validateInput = (input) => {
  const regex = /^[a-zA-Z0-9\s]+$/;
  const specialChars = /[!@#$%^&()_+\-=[]{};':"\|,.<>\/?]/;
  return regex.test(input) && !specialChars.test(input);
};
