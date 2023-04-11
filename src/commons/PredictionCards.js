import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { changeHour } from "../../utils/functions";

import {
  Box,
  Typography,
  Button,
  TextField,
  InputBase,
  Card,
} from "@mui/material";

import { IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import styles from "../styles/commons/predictionCards.module.css";
import stylesCard from "../styles/matches/ResultCard.module.css";

const PredictionCards = ({ game, handleScoreChange, user, id, date, hour }) => {
  const [userPredictions, setUserPredictios] = useState([]);
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");


  const handleAddHome = () => {
    let homeTeamScore = gamePredictions[0]?.prediction?.homeTeamScore;
    if (typeof homeTeamScore == "string" && typeof homeScore == "string") {
      setHomeScore(0);
    } else if (homeScore >= 0) {
      let newHomeTeamScore = homeScore + 1;
      setHomeScore(newHomeTeamScore);
    }
  };

  const handleRemoveHome = () => {
    let homeTeamScore = gamePredictions[0]?.prediction?.homeTeamScore;
    if (typeof homeTeamScore == "string" && typeof homeScore == "string") {
      setHomeScore(0);
    } else if (homeScore >= 1) {
      let newHomeTeamScore = homeScore - 1;
      setHomeScore(newHomeTeamScore);
    }
  };

  const handleAddAway = () => {
    let awayTeamScore = gamePredictions[0]?.prediction?.awayTeamScore;
    if (typeof awayTeamScore == "string" && typeof awayScore == "string") {
      setAwayScore(0);
    } else if (awayScore >= 0) {
      let newAwayTeamScore = awayScore + 1;
      setAwayScore(newAwayTeamScore);
    }
  };

  const handleRemoveAway = () => {
    let awayTeamScore = gamePredictions[0]?.prediction?.awayTeamScore;
    if (typeof awayTeamScore == "string" && typeof awayScore == "string") {
      setAwayScore(0);
    } else if (awayScore >= 1) {
      let newAwayTeamScore = awayScore - 1;
      setAwayScore(newAwayTeamScore);
    }
  };

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

  useEffect(() => {
    const gamePredictions = userPredictions?.filter(
      (prediction) => prediction.gameId._id === game._id
    );
    setHomeScore(gamePredictions[0]?.prediction?.homeTeamScore);
    setAwayScore(gamePredictions[0]?.prediction?.awayTeamScore);
  }, [userPredictions]);

  const gamePredictions = userPredictions?.filter(
    (prediction) => prediction.gameId._id === game._id
  );

  useEffect(() => {
    if (gamePredictions[0] && gamePredictions) {
      handleScoreChange(
        gamePredictions[0]?.gameId?._id,
        "homeTeamScore",
        homeScore
      );
      handleScoreChange(
        gamePredictions[0]?.gameId?._id,
        "awayTeamScore",
        awayScore
      );
    }
  }, [gamePredictions[0], homeScore, awayScore]);


console.log()


  return (

    <Card
      key={gamePredictions[0]?.gameId._id}
      sx={{ display: "flex", alignItems: "center", my: 2 }}
      className={stylesCard.customCard}
    >
      <Box className={stylesCard.cardColumn}>
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
        <Box className={stylesCard.teamLogoWrapper}>
          <img
            src={gamePredictions[0]?.prediction.homeTeam.logo_url}
            alt={gamePredictions[0]?.prediction.homeTeam.name}
            className={stylesCard.teamLogo}
          />
        </Box>
        <Box sx={{ margin: "0px 5px" }}>
          {gamePredictions[0]?.prediction.homeTeam.shortName}
        </Box>
        <Box
          className={stylesCard.cardColumn}
          sx={{ display: "flex", flexDirection: "column" }}
        >

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
              style: { appearance: "none", textAlign: "center" },
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
        </Box>
      </Box>
      <Typography sx={{ textAlign: "center" }}> Vs </Typography>
      <Box className={stylesCard.cardColumn}>
        <Box
          className={stylesCard.cardColumn}
          sx={{ display: "flex", flexDirection: "column" }}
        >
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
              style: { appearance: "none", textAlign: "center" },
              readOnly: true,
            }}
            className={styles.input}
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value)}
          />
          {gamePredictions[0]?.status != "close" ? (
            <IconButton aria-label="decrement" onClick={handleRemoveAway}>
              <Remove />
            </IconButton>
          ) : (
            ""
          )}
        </Box>
        <Box sx={{ margin: "0px 5px" }}>
          {gamePredictions[0]?.prediction.awayTeam.shortName}
        </Box>
        <Box className={stylesCard.teamLogoWrapper}>
          <img
            src={gamePredictions[0]?.prediction.awayTeam.logo_url}
            alt={gamePredictions[0]?.prediction.awayTeam.name}
            className={stylesCard.teamLogo}
          />
        </Box>

      </Box>
    </Card>
  );
};

export default PredictionCards;
