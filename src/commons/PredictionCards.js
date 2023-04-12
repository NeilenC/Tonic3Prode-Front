import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, InputBase, Card, useMediaQuery } from "@mui/material";

import { IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import styles from "../styles/commons/predictionCards.module.css";

const PredictionCards = ({ game, handleScoreChange, user, id, date, hour }) => {
  const [userPredictions, setUserPredictios] = useState([]);
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [status, setStatus] = useState("")
  const isMobile = useMediaQuery("(max-width:600px)");
  


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
    setStatus(gamePredictions[0]?.status)
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
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 2,
        borderRadius: "15px",
        width: isMobile ? "100%" : "450px",
        maxWidth: "100%",
        backgroundColor: status !== "pending" ? "#e0e0e0" : "#f5f5f5",
        boxShadow: status === "pending" ? "3px 3px 3px rgba(0,0,0,0.3)" : ""
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "60px",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          backgroundColor: status === "pending" ? "#3777d1" : "#5b5b5b",
        }}
      >
        <Typography sx={{marginRight: "10px"}}>Sab 20 ene, 2023 - 20:00 hs</Typography>
        <Typography> Dias 02 Horas 15 Segundos 30</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          width: "100%",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
        >
          <Box className={styles.teamLogoWrapper}>
            <img
              src={gamePredictions[0]?.prediction.homeTeam.logo_url}
              alt={gamePredictions[0]?.prediction.homeTeam.name}
              className={styles.teamLogo}
            />
          </Box>
          <Box sx={{ marginRight: "10px", textAlign: "center" }}>
            {gamePredictions[0]?.prediction.homeTeam.shortName}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginRight: "15px",
            }}
          >
            <IconButton aria-label="increment" onClick={handleAddHome}>
              <Add />
            </IconButton>
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
            <IconButton aria-label="decrement" onClick={handleRemoveHome}>
              <Remove />
            </IconButton>
          </Box>
        </Box>
        <Typography sx={{ textAlign: "center" }}> Vs </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            marginLeft: "15px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <IconButton aria-label="increment" onClick={handleAddAway}>
              <Add />
            </IconButton>
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
            <IconButton aria-label="decrement" onClick={handleRemoveAway}>
              <Remove />
            </IconButton>
          </Box>
          <Box sx={{ marginLeft: "10px" }}>
            {gamePredictions[0]?.prediction.awayTeam.shortName}
          </Box>
          <Box className={styles.teamLogoWrapper}>
            <img
              src={gamePredictions[0]?.prediction.awayTeam.logo_url}
              alt={gamePredictions[0]?.prediction.awayTeam.name}
              className={styles.teamLogo}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default PredictionCards;
