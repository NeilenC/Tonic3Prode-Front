import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// COMPONENTE
const Predictions = () => {
  const router = useRouter();
  const [games, setGames] = useState([]);
  const [scores, setScores] = useState({});
  const [user, setUser] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  useEffect(() => {
    console.log("id", router.query.id);
    if (router.query.id) {
      setId(router.query.id);
    }
  }, [router.query.id]);

  useEffect(() => {
    console.log(id);
    if (id) {
      console.log(`http://localhost:3001/api/games/${id}`);
      axios
        .get(`http://localhost:3001/api/games/${id}`)
        .then((allgames) => {
          return allgames;
        })
        .then((allgames) => {
          console.log(allgames);
          const games = allgames.data.filter(
            (item) => item.status === "pending"
          );
          setGames(games);
          console.log(games);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const handleScoreChange = (_id, team, score) => {
    setScores((prevState) => ({
      ...prevState,
      _id: {
        ...prevState[_id],
        [team]: score,
      },
    }));
  };

  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    setUser(localStorage.getItem("uid"));
  }, []);

  const sendPredictions = async (e) => {
    console.log(predictions);
    try {
      const response = await axios.post(
        `http://localhost:3001/api/predictions/create/${user}`,
        predictions
      );
      console.log(response);
      toast.success("You Successfully updated your predictions !");
    } catch (error) {
      console.error(error);
    }
  };

  const predictions = games.map((item) => {
    if (scores) {
      return {
        gameId: item._id,
        prediction: {
          homeTeam: item.teams[0].name,
          awayTeam: item.teams[1].name,
          homeTeamScore: scores._id?.team1Score || "",
          awayTeamScore: scores._id?.team2Score || "",
        },
      };
    }
  });

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Button
        onClick={() => sendPredictions()}
        variant="contained"
        endIcon={<SportsSoccerIcon />}
        sx={{
          textAlign: "center",
          width: "auto",
          height: "1.5%",
          margin: "10px",
        }}
      >
        Guardar Predicciones
      </Button>
      <form
        onSubmit={sendPredictions}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          widht: "auto",
        }}
      >
        {games.map((item) => (
          <Box
            key={item._id}
            sx={{
              textAlign: "center",
              my: 2,
              border: "0.25px solid lightblue",
              borderRadius: "5px",
              width: "auto",
              height: "auto",
              padding: "10px",
              mx: 20,
            }}
          >
            <img
              src={item.teams[0].logo_url}
              alt={item.teams[0].name}
              style={{ width: "4%", height: "auto" }}
            />

            <span style={{ fontSize: "90%", display: "inline-block" }}>
              {item.teams[0].shortName}
            </span>
            <TextField
              type="number"
              // value={scores[item._id]?.team1Score || ""}
              onChange={(e) =>
                handleScoreChange(item._id, "team1Score", e.target.value)
              }
              sx={{ mx: 3, textAlign: "center", width: "10%", height: "1.5%" }}
            />
            <span>-</span>
            <TextField
              type="number"
              // value={scores[item._id]?.team2Score || ""}
              onChange={(e) =>
                handleScoreChange(item._id, "team2Score", e.target.value)
              }
              sx={{ mx: 3, textAlign: "center", width: "10%", height: "1.5%" }}
            />
            <span style={{ fontSize: "90%", display: "inline-block" }}>
              {item.teams[1].shortName}
            </span>
            <img
              src={item.teams[1].logo_url}
              alt={item.teams[1].name}
              style={{ width: "4%", height: "auto" }}
            />
          </Box>
        ))}
      </form>
      <Button
        onClick={() => sendPredictions()}
        variant="contained"
        endIcon={<SportsSoccerIcon />}
        sx={{
          textAlign: "center",
          width: "auto",
          height: "1.5%",
          margin: "15px",
        }}
      >
        Guardar Predicciones
      </Button>
    </Box>
  );
};

export default Predictions;
