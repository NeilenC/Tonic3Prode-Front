import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";

const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <h1>
        <FormattedMessage id="welcome" /> {user.name}
      </h1>
    </>
  );
};

export default Home;
