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
import Tournaments from "./tournaments/index";
import Teams from "./Teams";
import Players from "./Players";
import Prizes from "./Prizes";
import Users from "./Users";
import Metrics from "./Metrics";

const index = () => {
  const [actualComponent, setActualComponent] = useState("tournaments");

  const changeActualComponent = (componente) => {
    setActualComponent(componente);
  };

  const components = {
    tournaments: <Tournaments />,
    teams: <Teams />,
    players: <Players />,
    prizes: <Prizes />,
    users: <Users />,
    metrics: <Metrics />,
  };

  return (
    <Box
    >
      <Box  sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px",
        alignItems: "center",
        marginTop: "20px",
        flexDirection: { xs: "column", md: "row" },
      }}>
        <Button sx={{marginRight:"10px" }} startIcon={<TournamentIcon />} onClick={() => changeActualComponent("tournaments")}>Tournaments</Button>
        <Button sx={{marginRight:"10px" }} startIcon={<TeamsIcon />} onClick={() => changeActualComponent("teams")} >Teams</Button>
        <Button sx={{marginRight:"10px" }} startIcon={<PlayersIcon />} onClick={() => changeActualComponent("players")}>Team players</Button>
        <Button sx={{marginRight:"10px" }} startIcon={<PrizesIcon />}onClick={() => changeActualComponent("prizes")}>Prizes</Button>
        <Button sx={{marginRight:"10px" }} startIcon={<UsersIcon />}onClick={() => changeActualComponent("users")}>Users</Button>
        <Button startIcon={<MetricsIcon />} onClick={() => changeActualComponent("metrics")}>Metrics</Button>
       
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
      {actualComponent && components[actualComponent]}
      </Box>
    </Box>
  );
};

export default index;
