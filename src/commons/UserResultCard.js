import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  InputBase,
  Card,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { IconButton } from "@mui/material";
import styles from "../styles/commons/predictionCards.module.css";
import ImageFilter from "react-image-filter/lib/ImageFilter";


const UserResultCard = ({ game, handleScoreChange, user, id, date, hour }) => {
  const [userPredictions, setUserPredictios] = useState([]);
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [status, setStatus] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

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
    setStatus(gamePredictions[0]?.status);
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
        boxShadow: status === "pending" ? "3px 3px 3px rgba(0,0,0,0.3)" : "",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "30px",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          backgroundColor: status === "pending" ? "#3777d1" : "#5b5b5b",
        }}
      >
        <Typography sx={{ marginRight: "10px" }}>
          Sab 20 ene, 2023 - 20:00 hs
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1,
          width: "100%",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
        >
          <Box className={styles.teamLogoWrapper}>

            {/* //AGREGAR CONDICIONALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL DE PERDEDOR A LOS LOGOS*/}

            <ImageFilter
              image={gamePredictions[0]?.prediction.homeTeam.logo_url}
              filter={"grayscale"}
              alt={gamePredictions[0]?.prediction.homeTeam.name}
              className={styles.teamLogo}
              style={{ opacity: 0.4 }}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "65px",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography
          sx={{
            color:"#1976d3"
          }}
        >
          Result: 2 - 3 (4 - 5) 
        </Typography>
        <Typography
          sx={{
            color: "white",
            backgroundColor: "#1976d3",
            width: "100px",
            borderRadius: "5px",
            margin:"10px",
          }}
        >
          Puntos: 3
        </Typography>
      </Box>
    </Card>
  );
};

export default UserResultCard;
