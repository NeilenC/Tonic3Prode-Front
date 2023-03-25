import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FutureMatches from "../matches/FutureMatches";
import RankingCard from "../ranking/RankingCard";
import Navbar from "./Navbar";

const home = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <Navbar />
      <RankingCard />
      <FutureMatches />
    </>
  );
};

export default home;
