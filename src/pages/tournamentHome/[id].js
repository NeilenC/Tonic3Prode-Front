import React from "react";
import { Box, Button } from "@mui/material";
import {
  Scoreboard as MypredictionsIcon,
  TableRows as FixtureIcon,
  Stars as RankingIcon,
  EmojiEvents as PrizesIcon,
  Sports as TournamentIcon,
} from "@mui/icons-material";
import { useRouter } from "next/router";

const Home = ({}) => {
  const router = useRouter();
  const id  = router.query.id;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <Button
        size="xl"
        variant="outlined"
        startIcon={<MypredictionsIcon />}
        sx={{ width: "250px", margin: "25px 0px 15px 0px", fontSize: "20px" }}
        onClick = {() => {window.location.href = `/predictions`}}
      >
        My predictions
      </Button>

      <Button
        size="xl"
        variant="outlined"
        startIcon={<FixtureIcon />}
        sx={{ width: "250px", marginBottom: "15px", fontSize: "20px"}}
        onClick = {() => {window.location.href = `/fixture`}}
      >
        Fixture
      </Button>

      <Button
        size="xl"
        variant="outlined"
        startIcon={<RankingIcon />}
        sx={{ width: "250px", marginBottom: "15px", fontSize: "20px"}}
        onClick = {() => {window.location.href = `/ranking`}}
      >
        Ranking
      </Button>

      <Button
        size="xl"
        variant="outlined"
        startIcon={<PrizesIcon />}
        sx={{ width: "250px", marginBottom: "15px", fontSize: "20px"}}
        onClick = {() => {window.location.href = `/tournament/${id}/prizes`}} 
      >
        Prizes
      </Button>

      <Button
        size="xl"
        variant="outlined"
        startIcon={<TournamentIcon />}
        sx={{ width: "250px", marginBottom: "15px", fontSize: "20px"}}
        onClick = {() => {window.location.href = `/home`}}
      >
        Tournaments
      </Button>
    </Box>
  );
};

export default Home;
