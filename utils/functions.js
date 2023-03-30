import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { providerGoogle } from "./firebaseConfig";
import axios from "axios";
import toast from "react-hot-toast";
import { setFirstLogin } from "../redux/reducers/firstLogin";
import { setUid } from "../redux/reducers/uid";
import { setUserInfo } from "../redux/reducers/userInfo";

export const signUpGoogle = async (auth, dispatch) => {
  try {
    const res = await signInWithPopup(auth, providerGoogle);
    const userFirebase = await new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => resolve(user));
    });
    console.log("USERF", userFirebase);
    const users = await axios.get("http://localhost:3001/api/users");
    dispatch(setUid(userFirebase.uid));
    dispatch(setUserInfo({
      email: userFirebase.email,
      fullName: userFirebase.displayName,
    }));
    const userMongoDB = users.data.filter(
      (user) => user.uid === userFirebase.uid
    );
    if (userMongoDB.length > 0) {
      dispatch(setFirstLogin(false));
      toast.success("Successfully Logged In !");
      //window.location.href = "http://localhost:3000/home";
    } else {
      dispatch(setFirstLogin(true));
      dispatch(
      setUserInfo({
              email: userFirebase.email,
              username: userFirebase.displayName,
            })
          );
      toast.error(
        "User not found in database. Please complete the login form."
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const logOut = (auth) => {
  signOut(auth);
};
