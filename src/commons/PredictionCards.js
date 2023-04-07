import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { changeHour } from "../../utils/functions";
import { Box, Typography, Button, TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import styles from "../styles/commons/predictionCards.module.css";

const PredictionCards = ({
  game,
  // handleScoreChange,
  user,
  id,
}) => {
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [userPredictions, setUserPredictios] = useState([]);
  //const [scores, setScores] = useState({})

  const handleTeam1Increment = () => {
    console.log("FUNCIONA LINEA 22");
    const awayTeamScore = gamePredictions[0]?.prediction.awayTeamScore;
    if (typeof awayTeamScore == "string") {
      awayTeamScore = 0;
    } else {
      setTeam1Score(awayTeamScore + 1);
    }
  };

  const handleTeam1Decrement = () => {
    const awayTeamScore = gamePredictions[0]?.prediction.awayTeamScore;
    if (typeof awayTeamScore == "string") {
      awayTeamScore = 0;
    } else {
      setTeam1Score(awayTeamScore - 1);
    }
  };

  const handleTeam2Increment = () => {
    const homeTeamScore = gamePredictions[0]?.prediction.homeTeamScore;
    if (typeof homeTeamScore == "string") {
      homeTeamScore = 0;
    } else {
      setTeam2Score(homeTeamScore + 1);
    }
  };

  const handleTeam2Decrement = () => {
    const homeTeamScore = gamePredictions[0]?.prediction.homeTeamScore;
    if (typeof homeTeamScore == "string") {
      homeTeamScore = 0;
    } else {
      setTeam2Score(homeTeamScore + 1);
    }
  };

  useEffect(() => {
    handleTeam1Increment();
    handleTeam1Decrement();
    handleTeam2Increment();
    handleTeam2Decrement();
  }, [team1Score, team2Score]);

  //   // useEffect(() => {
  //   //   handleScoreChange(item._id, "team1Score", team1Score);
  //   //   handleScoreChange(item._id, "team2Score", team2Score);
  //   // }, [team1Score, team2Score]);

  // //////// TRAE LAS PREDICCIONES DE UN USUARIO Y SE FILTRA POR EL TORNEO ACTUAL ///////
  useEffect(() => {
    const getUserPredictions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/predictions/${user}
              `
        );
        console.log("Linea 78", response.data);
        const predictionsData = response.data;
        const filterPredictios = predictionsData.filter(
          (prediction) => prediction.gameId.tournaments == id
        );
        console.log("linea 83", filterPredictios);
        setUserPredictios(filterPredictios);
      } catch (error) {
        console.error(error);
      }
    };
    getUserPredictions();
  }, [game]);

  ////Comparando el id del game que pertecene a una prediccion, con el id del game que pasan por item ////
  const gamePredictions = userPredictions?.filter(
    (prediction) => prediction.gameId._id === game._id
  );
  console.log("GAMEPREDICTIONS =======>", gamePredictions);
  return (
    <>
      <Box
        key={gamePredictions[0]?.gameId._id}
        sx={{ display: "flex", alignItems: "center", my: 2 }}
      >
        <Typography>{changeHour(game.hour)}</Typography>
        {game.result[0] ? (
          <Box
            sx={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ textAlign: "center", justifyContent: "center" }}>
              Result:
            </Typography>
            <Box>
              {game.result[0]?.homeTeamScore} - {game.result[0]?.awayTeamScore}
            </Box>
          </Box>
        ) : (
          ""
        )}

        <img
          src={gamePredictions[0]?.prediction.homeTeam.logo_url}
          alt={gamePredictions[0]?.prediction.homeTeam.name}
          style={{ width: "4%" }}
        />
        <span style={{ fontSize: "90%", display: "inline-block" }}>
          {gamePredictions[0]?.prediction.homeTeam.shortName}
        </span>
        {gamePredictions[0]?.status != "close" ? (
          <IconButton
            aria-label="increment"
            onClick={() => handleTeam1Increment()}
          >
            <Add />
          </IconButton>
        ) : (
          ""
        )}
        <input
          type="number"
          defaultValue={0}
          //value={value}
          onChange={(e) => handleTeam1Increment()}
        />
        {gamePredictions[0]?.status != "close" ? (
          <IconButton aria-label="decrement">
            <Remove />
          </IconButton>
        ) : (
          ""
        )}
        <span> Vs </span>
        {gamePredictions[0]?.status != "close" ? (
          <IconButton aria-label="increment">
            <Add />
          </IconButton>
        ) : (
          ""
        )}
        <input
          type="number"
          value={gamePredictions[0]?.prediction.awayTeamScore}
          // onChange={(e) =>
          //   handleScoreChange(item._id, "team2Score", e.target.value)
          // }
          sx={{
            mx: 3,
            textAlign: "center",
            width: "10%",
            height: "1.5%",
          }}
        />
        {gamePredictions[0]?.status != "close" ? (
          <IconButton aria-label="decrement">
            <Remove />
          </IconButton>
        ) : (
          ""
        )}
        <span style={{ fontSize: "90%", display: "inline-block" }}>
          {gamePredictions[0]?.prediction.awayTeam.shortName}
        </span>
        <img
          src={gamePredictions[0]?.prediction.awayTeam.logo_url}
          alt={gamePredictions[0]?.prediction.awayTeam.name}
          style={{ width: "4%" }}
        />
      </Box>
    </>
  );
};

export default PredictionCards;
