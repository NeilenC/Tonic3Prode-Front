import React ,{ useEffect, useState }from 'react'
import { useDispatch } from "react-redux";
import { setUserInfo } from './reducers/userInfo'; 

const UserProvider = ({children}) => {
    const [uid, setUid] = useState("");
    const dispatch = useDispatch();
  
  
    useEffect(() => {
      setUid(localStorage.getItem("uid"));
    }, []);
  
  
    async function getUser() {
      try {
        const response = await fetch(
          `http://localhost:3001/api/users/search/${uid}`
        );
  
        const data = await response.json();
        dispatch(
          setUserInfo({
            uid: data.uid,
            username: data.username,
            cellphone: data.cellphone,
            address: data.address,
            fullName: `${data.name} ${data.lastName}`,
            email: data.email,
          })
        );
  
        return data;
      } catch (err) {
       console.log(err);
      }
    }
  
    useEffect(() => {
      if (uid) {
        getUser();
      }
    }, [uid]);
  
  return (
    <div>{children}</div>
  )
}

export default UserProvider