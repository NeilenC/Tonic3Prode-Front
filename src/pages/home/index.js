import { Link } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FutureMatches from "../matches/FutureMatches";
import RankingCard from "../ranking/PositionCard";

const home = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
    <Link href={"/ranking"}>
      <RankingCard />
      </Link>
      <FutureMatches />
    </>
  );
};

export default home;
