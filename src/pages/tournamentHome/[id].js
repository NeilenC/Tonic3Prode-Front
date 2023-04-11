import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import {
  Scoreboard as MypredictionsIcon,
  TableRows as FixtureIcon,
  Stars as RankingIcon,
  EmojiEvents as PrizesIcon,
  Sports as TournamentIcon,
  Games,
} from "@mui/icons-material";
import { useRouter } from "next/router";


const Home = ({}) => {
  const router = useRouter();
  const [games, setGames] = useState([]);
  const [scores, setScores] = useState({});
  const [user, setUser] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (router.query.id) {
      setId(router.query.id);
    }
  }, [router.query.id]);

  useEffect(() => {
    setUser(localStorage.getItem("uid"));
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/api/games/search/${id}/${user}`)
        .then((allgames) => {
          return allgames;
        })
        .then((allgames) => {
          const games = allgames.data.filter(
            (item) => item.status === "pending"
          );
          setGames(games);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const predictions = games.map((game) => {
    if (scores) {
      return {
        gameId: game?._id,
        prediction: {
          homeTeam: game?.teams[0].name,
          awayTeam: game?.teams[1].name,
          homeTeamScore: "",
          awayTeamScore: "",
        },
        status: "pending",
      };
    }
  });

  const sendPredictions = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/predictions/create/${user}`,
        predictions
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        size="xl"
        variant="outlined"
        startIcon={<MypredictionsIcon />}
        sx={{ width: "250px", margin: "25px 0px 15px 0px", fontSize: "20px" }}
        onClick={() => {
          sendPredictions();
          router.push(`Predictions/${id}`);
        }}
      >
        Predictions
      </Button>
      <Button
        size="xl"
        variant="outlined"
        startIcon={<RankingIcon />}
        sx={{ width: "250px", marginBottom: "15px", fontSize: "20px" }}
        onClick={() => {
          router.push(`/ranking/${id}`);
        }}
      >
        Ranking
      </Button>

      <Button
        size="xl"
        variant="outlined"
        startIcon={<PrizesIcon />}
        sx={{
          width: "250px",
          marginBottom: "15px",
          fontSize: "20px",
          textDecoration: "none",
        }}
        onClick={() => {
          router.push(`/tournament/${id}/prizes`);
        }}
      >
        Prizes
      </Button>

      <Button
        size="xl"
        variant="outlined"
        startIcon={<TournamentIcon />}
        sx={{ width: "250px", marginBottom: "15px", fontSize: "20px" }}
        onClick={() => {
          router.push(`/home`);
        }}
      >
      Home
      </Button>
    </Box>
  );
};
//};

export default Home;
