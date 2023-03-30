import HomeButton from "../tournamentHome/HomeButton";
import React from "react";
import { useSelector } from "react-redux";
// import slidePrototype from "../slideProtorype"
import Link from "next/link";
import RankingCard from "../ranking/PositionCard";



const home = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div>
        <Link href={"/sliderHome"}>
          <HomeButton title={`Proximos Partidos`} />
        </Link>
        <Link href={"/predictions"}>
          <HomeButton title={`Predicciones`} />
        </Link>
        <Link href={"/"}> 
          <HomeButton title={`Resultados`} />
        </Link>
        <Link href={"/ranking"}>
          <HomeButton title={`Ranking`} />
        </Link>
        <Link href={"/"}>
          <HomeButton title={`Fixture`} />
        </Link>
      </div>
    </>
  );
};

export default home;
