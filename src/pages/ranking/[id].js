
import { Box } from "@mui/system";
import React from "react";
import { useEffect, useState } from "react";
import RankingPodium from "./Podium";
import RankingSearch from "./Search";
import axios from "axios";
import { useRouter } from "next/router";
import { set } from "date-fns";

const id = () => { 
const router = useRouter()
const tournamentId = router.query.id;
const [ranking, setRanking] = useState([]);


// useEffect(() => {
// const uid = localStorage.getItem("uid");
// console.log(tournamentId, "xxxxx")
// axios.get(`http://localhost:3001/api/rankings/search/${tournamentId}/${uid}`).then((response) => {
//   setRanking(response.data)
// })
// }, []);

  return (
    <div>
      <RankingPodium />
      <Box sx={{display: "flex", justifyContent: "center",
  alignItems: "center"}}>
        <RankingSearch />
      </Box>
    </div>
  );
};

export default id;
