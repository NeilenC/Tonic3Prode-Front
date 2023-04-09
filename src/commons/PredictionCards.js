import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { changeHour } from "../../utils/functions";
import { Box, Typography, Button, TextField, InputBase } from "@mui/material";
import { IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import styles from "../styles/commons/predictionCards.module.css";
import stylesCard from "../styles/matches/ResultCard.module.css";

const PredictionCards = ({ game, handleScoreChange, user, id }) => {
  const [userPredictions, setUserPredictios] = useState([]);
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");

  const handleAddHome = () => {
    let homeTeamScore = gamePredictions[0]?.prediction.homeTeamScore;
    if (typeof homeTeamScore == "string" && typeof homeScore == "string") {
      setHomeScore(0);
    } else if (homeScore >= 0) {
      let newHomeTeamScore = homeScore + 1;
      setHomeScore(newHomeTeamScore);
    }
  };

  const handleRemoveHome = () => {
    let homeTeamScore = gamePredictions[0]?.prediction.homeTeamScore;
    if (typeof homeTeamScore == "string" && typeof homeScore == "string") {
      setHomeScore(0);
    } else if (homeScore >= 1) {
      let newHomeTeamScore = homeScore - 1;
      setHomeScore(newHomeTeamScore);
    }
  };

  const handleAddAway = () => {
    let awayTeamScore = gamePredictions[0]?.prediction.awayTeamScore;
    if (typeof awayTeamScore == "string" && typeof awayScore == "string") {
      setAwayScore(0);
    } else if (awayScore >= 0) {
      let newAwayTeamScore = awayScore + 1;
      setAwayScore(newAwayTeamScore);
    }
  };

  const handleRemoveAway = () => {
    let awayTeamScore = gamePredictions[0]?.prediction.awayTeamScore;
    if (typeof awayTeamScore == "string" && typeof awayScore == "string") {
      setAwayScore(0);
    } else if (awayScore >= 1) {
      let newAwayTeamScore = awayScore - 1;
      setAwayScore(newAwayTeamScore);
    }
  };

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

  useEffect(() => {
    const gamePredictions = userPredictions?.filter(
      (prediction) => prediction.gameId._id === game._id
    );
    setHomeScore(gamePredictions[0]?.prediction.homeTeamScore);
    setAwayScore(gamePredictions[0]?.prediction.awayTeamScore);
  }, [userPredictions]);

  const gamePredictions = userPredictions?.filter(
    (prediction) => prediction.gameId._id === game._id
  );

  useEffect(() => {
    if (gamePredictions[0] && gamePredictions) {
      handleScoreChange(
        gamePredictions[0]?.gameId._id,
        "homeTeamScore",
        homeScore
      );
      handleScoreChange(
        gamePredictions[0]?.gameId._id,
        "awayTeamScore",
        awayScore
      );
    }
  }, [gamePredictions[0], homeScore, awayScore]);

  /////////////////////////COMPONENTE/////////////////////////////////

  return (
    <>
      <Box
        key={gamePredictions[0]?.gameId._id}
        sx={{ display: "flex", alignItems: "center", my: 2 }}
        s
        className={stylesCard.customCard}
      >
        <div className={stylesCard.cardColumn}>
          {game.result[0] ? (
            <Box
              sx={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{ textAlign: "center", justifyContent: "center" }}
              >
                Result:
              </Typography>
              <Box>
                {game.result[0]?.homeTeamScore} -{" "}
                {game.result[0]?.awayTeamScore}
              </Box>
            </Box>
          ) : (
            ""
          )}
          <div className={stylesCard.cardColumn}>
            <div className={stylesCard.teamLogoWrapper}>
              <img
                src={gamePredictions[0]?.prediction.homeTeam.logo_url}
                alt={gamePredictions[0]?.prediction.homeTeam.name}
                className={stylesCard.teamLogo}
              />
            </div>
          </div>
          <div className={stylesCard.titleWrapper}>
            {gamePredictions[0]?.prediction.homeTeam.shortName}
          </div>
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
            value={homeScore}
            onChange={(e) => setHomeScore(e.target.value)}
          />
          {gamePredictions[0]?.status != "close" ? (
            <IconButton aria-label="decrement" onClick={handleRemoveHome}>
              <Remove />
            </IconButton>
          ) : (
            ""
          )}
        </div>
        <span> Vs </span>
        <div className={stylesCard.cardColumn}>
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
          <div className={stylesCard.titleWrapper}>
            {gamePredictions[0]?.prediction.awayTeam.shortName}
          </div>
          <div className={stylesCard.cardColumn}>
            <div className={stylesCard.teamLogoWrapper}>
              <img
                src={gamePredictions[0]?.prediction.awayTeam.logo_url}
                alt={gamePredictions[0]?.prediction.awayTeam.name}
                className={stylesCard.teamLogo}
              />
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default PredictionCards;
