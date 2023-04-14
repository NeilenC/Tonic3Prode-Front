import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import {
  SportsSoccer as TournamentIcon,
  SportsHandball as PlayersIcon,
  Group as TeamsIcon,
  EmojiEvents as PrizesIcon,
  BarChart as MetricsIcon,
  SwitchAccount as UsersIcon
} from "@mui/icons-material";
import Teams from "./Teams";
import Results from "./ResultsBis";
import Ranking from "./Ranking";
import Users from "./Users";
import Prizes from "./Prizes";
import Metrics from "./Metrics";
import axios from "axios";


const id = () => {
  const [actualComponent, setActualComponent] = useState("results");
  const [tournament, setTournament] = useState({})
  const router = useRouter();
  const tournamentId = router.query.id;
  
  useEffect(() => {
    async function getTournament() {
      if (tournamentId) {
        const response = await axios.get(`http://localhost:3001/api/tournaments/${tournamentId}`);
        setTournament(response.data);
      }
    }
    getTournament();
  }, [tournamentId]);

  const changeActualComponent = (component) => {
    setActualComponent(component);
  };

  const components = {
    results: <Results />,
    ranking: <Ranking />,
  };

  const icons = {
    results: <TournamentIcon />,
    ranking: <TeamsIcon />,
  };

  const buttons = [
    { text: "Results", component: "results" },
    { text: "Ranking", component: "ranking" },
  ];

  return (
    <Box>
      <Box  sx={{ display: "flex", flexDirection:"column",justifyContent: "center", alignItems: "center", margin: "10px", marginTop: "20px"}}>
        <Button onClick={()=>{window.location.href = "http://localhost:3000/admin"}} variant="outlined">
        Go back to Admin
        </Button>
        <h2>{(tournament.title)?`${tournament.title?.toUpperCase()}`:null}</h2>
      </Box>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", margin: "10px", marginTop: "20px", flexDirection: { xs: "column", md: "row" } }}>
        {buttons.map((button) => (
          <Button key={button.component} sx={{ marginRight: "10px" }} startIcon={icons[button.component]} onClick={() => changeActualComponent(button.component)}>{button.text}</Button>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        {actualComponent && components[actualComponent]}
      </Box>
    </Box>
  );
};

export default id;