import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import FutureMatches from "../matches/FutureMatches";
import RankingCard from "../ranking/PositionCard";
import Link from "next/link";


const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <h1>
        <FormattedMessage id="welcome" /> 
      </h1>
      <Link href={"/ranking"}>
      <RankingCard />
      </Link>
      <FutureMatches />
    </>
  );
};

export default Home;
