import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
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

const id = () => {
  const [actualComponent, setActualComponent] = useState("results");

  const changeActualComponent = (component) => {
    setActualComponent(component);
  };

  const components = {
    results: <Results />,
    ranking: <Ranking />,
    teams: <Teams />,
    users: <Users />,
    prizes: <Prizes />,
    metrics: <Metrics />,
  };

  const icons = {
    results: <TournamentIcon />,
    ranking: <TeamsIcon />,
    teams: <PlayersIcon />,
    users: <PrizesIcon />,
    prizes: <UsersIcon />,
    metrics: <MetricsIcon />,
  };

  const buttons = [
    { text: "Results", component: "results" },
    { text: "Ranking", component: "ranking" },
    { text: "Teams", component: "teams" },
    { text: "Users", component: "users" },
    { text: "Prizes", component: "prizes" },
    { text: "Metrics", component: "metrics" },
  ];

  return (
    <Box>
      <Box  sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px", marginTop: "20px"}}>
        <Button onClick={()=>{window.location.href = "http://localhost:3000/admin"}} variant="contained">
        Go back to Admin
        </Button>
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