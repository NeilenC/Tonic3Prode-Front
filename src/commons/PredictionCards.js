import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { changeHour } from "../../utils/functions";
import { Box, Typography, Button, TextField, InputBase } from "@mui/material";
import { IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import styles from "../styles/commons/predictionCards.module.css";
import { string } from "i/lib/util";
//import styles from "../styles/matches/ResultCard.module.css";

const PredictionCards = ({
  game,
  // handleScoreChange,
  user,
  id,
}) => {
  const [userPredictions, setUserPredictios] = useState([]);
  //const [scores, setScores] = useState({})
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");

  console.log("=========> HOME", homeScore);
  console.log("========> AWAY", awayScore);

  ////////////////////////////////////////////////////

  const handleAddHome = () => {
    let homeTeamScore = gamePredictions[0].prediction.homeTeamScore;
    if (typeof homeTeamScore == "string" && typeof homeScore == "string") {
      setHomeScore(0);
    } else if (homeScore >= 0) {
      let newHomeTeamScore = homeScore + 1;
      setHomeScore(newHomeTeamScore);
    }
  };

  const handleRemoveHome = () => {
    let homeTeamScore = gamePredictions[0].prediction.homeTeamScore;
    if (typeof homeTeamScore == "string" && typeof homeScore == "string") {
      setHomeScore(0);
    } else if (homeScore >= 1) {
      let newHomeTeamScore = homeScore - 1;
      setHomeScore(newHomeTeamScore);
    }
  };

  const handleAddAway = () => {
    let awayTeamScore = gamePredictions[0].prediction.awayTeamScore;
    if (typeof awayTeamScore == "string" && typeof awayScore == "string") {
      setAwayScore(0);
    } else if (awayScore >= 0) {
      let newAwayTeamScore = awayScore + 1;
      setAwayScore(newAwayTeamScore);
    }
  };

  const handleRemoveAway = () => {
    let awayTeamScore = gamePredictions[0].prediction.awayTeamScore;
    if (typeof awayTeamScore == "string" && typeof awayScore == "string") {
      setAwayScore(0);
    } else if (awayScore >= 1) {
      let newAwayTeamScore = awayScore - 1;
      setAwayScore(newAwayTeamScore);
    }
  };

  // useEffect(() => {
  //   handleTeam1Increment();
  //   handleTeam1Decrement();
  //   handleTeam2Increment();
  //   handleTeam2Decrement();
  // }, [team1Score, team2Score]);

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
        const predictionsData = response.data;
        const filterPredictios = predictionsData.filter(
          (prediction) => prediction.gameId.tournaments == id
        );
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
  //console.log("GAMEPREDICTIONS =======>", gamePredictions);
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
          <IconButton aria-label="increment" onClick={handleAddHome}>
            <Add />
          </IconButton>
        ) : (
          ""
        )}
        <InputBase
          inputProps={{
            "aria-label": "score",
            min: "0",
            type: "number",
            style: { appearance: "none" },
          }}
          className={styles.input}
          value={
            typeof gamePredictions[0]?.prediction.homeTeamScore == "number"
              ? gamePredictions[0]?.prediction.homeTeamScore
              : homeScore
          } /// Si la existe la prediccion que la muestre, si no que muestre el "" de homeScore
          onChange={(e) => setHomeScore(e.target.value)}
        />
        {gamePredictions[0]?.status != "close" ? (
          <IconButton aria-label="decrement" onClick={handleRemoveHome}>
            <Remove />
          </IconButton>
        ) : (
          ""
        )}
        <span> Vs </span>
        {gamePredictions[0]?.status != "close" ? (
          <IconButton aria-label="increment" onClick={handleAddAway}>
            <Add />
          </IconButton>
        ) : (
          ""
        )}
        <InputBase
          inputProps={{
            "aria-label": "score",
            min: "0",
            type: "number",
            style: { appearance: "none" },
          }}
          className={styles.input}
          value={awayScore}
          onChange={(e) => setAwayScore(e.target.value)}
          sx={{
            mx: 3,
            textAlign: "center",
            width: "10%",
            height: "1.5%",
          }}
        />
        {gamePredictions[0]?.status != "close" ? (
          <IconButton aria-label="decrement" onClick={handleRemoveAway}>
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
