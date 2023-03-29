import HomeButton from "@/commons/homeButton";
import { HourglassBottomTwoTone } from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FutureMatches from "../matches/FutureMatches";
// import slidePrototype from "../slideProtorype"
import RankingCard from "../ranking/PositionCard";
import Link from "next/link";

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
      </div>
    </>
  );
};

export default home;
