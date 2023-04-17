import { Box } from "@mui/system";
import React from "react";
import { useEffect, useState } from "react";
import RankingPodium from "./Podium";
import RankingSearch from "./Search";
import axios from "axios";
import { useRouter } from "next/router";
//import { set } from "date-fns";

const id = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [rankings, setRankings] = useState([]);
  const [userCountry, setUserCountry] = useState("");

  useEffect(() => {
    if (router.query.id) {
      setId(router.query.id);
    }
  }, [router.query.id]);

  useEffect(() => {
    const uid = localStorage.getItem("uid");

    async function getTournamentRankings() {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/rankings/search/${id}/${uid}`
        );
        const filteredRankings = response.data.filter(
          (ranking) => ranking.userId.uid === uid
        );
        const country = filteredRankings[0].country;
        setUserCountry(country);
        const updatedRankings = response.data
          .filter((ranking) => ranking.country === country)
          .map((ranking) => {
            const score = ranking.predictions.reduce(
              (acc, prediction) => acc + prediction.points,
              0
            );
            return {
              ...ranking,
              score,
            };
          });
        setRankings(updatedRankings);
      } catch (err) {
        console.log(err);
      }
    }
    getTournamentRankings();
  }, [id]);

  const sortedRankings = rankings.sort((a, b) => b.score - a.score);
  console.log(sortedRankings);

  return (
    <div>
      <RankingPodium ranking={sortedRankings} />
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <RankingSearch ranking={sortedRankings} />
      </Box>
    </div>
  );
};

export default id;
