import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";

const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <h1>
      

      </h1>
      <div > <FormattedMessage
          id="welcome"
        /> {user.name}</div>
    </>
  );
};

export default Home;
