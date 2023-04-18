import React from "react";
import { useSelector } from "react-redux";

import Fixture from "../fixture";
import RankingCard from "../ranking/PositionCard";
import Link from "next/link";


const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <h1>
     
      </h1>
      <Link href={"/ranking"}>
      <RankingCard />
      </Link>
      <Fixture />
    </>
  );
};

export default Home;
