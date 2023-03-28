import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import Example from "../slidePrototype";

const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <Example />
    </>
  );
};

export default Home;
