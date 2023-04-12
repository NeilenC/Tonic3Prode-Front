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
import styles from "../styles/commons/predictionCards.module.css";
import ImageFilter from "react-image-filter/lib/ImageFilter";

const UserResultCard = ({ game, user, id, currentDate, order }) => {

  const [userPredictions, setUserPredictios] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  //// TRAE LAS PREDICCIONES DE UN USUARIO Y SE FILTRA POR EL TORNEO ACTUAL ///
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

  const gamePredictions = userPredictions?.filter(
    (prediction) => prediction.gameId._id === game._id
  );
  

  ////// Sirve para cambiar el color de la imagen segun si es ganador o perdedor ////
  // const filterStyles = {
  //   filter:
  //     game?.result?.winningTeam !== game?.teams[0].name
  //       ? "grayscale opacity(0.4)"
  //       : "none",
  // };

  // const filterStyles2 = {
  //   filter:
  //     game?.result?.winningTeam !== game?.teams[1].name
  //       ? "grayscale opacity(0.4)"
  //       : "none",
  // };

  /////////////////////////COMPONENTE/////////////////////////////////

  return (
    <Card
      key={game?._id}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 2,
        borderRadius: "15px",
        width: isMobile ? "100%" : "450px",
        maxWidth: "100%",
        backgroundColor: "#f5f5f5",
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
          backgroundColor: "#5b5b5b",
        }}
      >
        <Typography sx={{ marginRight: "10px" }}>
          {currentDate[order]}
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
              image={game?.teams[0]?.logo_url}
              alt={game?.teams[0]?.name}
              className={styles.teamLogo}
              filter={"grayscale"}
              style={{ opacity: 0.4 }}
            />
          </Box>
          <Box sx={{ marginRight: "10px", textAlign: "center" }}>
            {game?.teams[0]?.shortName}
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
              value={gamePredictions[0]?.prediction?.homeTeamScore}
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
              value={gamePredictions[0]?.prediction?.awayTeamScore}
            />
          </Box>
          <Box sx={{ marginLeft: "10px" }}>{game?.teams[1]?.shortName}</Box>
          <Box className={styles.teamLogoWrapper}>
            <ImageFilter
              image={game?.teams[1]?.logo_url}
              alt={game?.teams[1]?.name}
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
            color: "#1976d3",
          }}
        >
          {game?.result?.winningType === "regular"
            ? `Results: ${game?.result?.homeTeamScore} - ${game?.result?.awayTeamScore}`
            : `Results: ${game?.result?.homeTeamScore} - ${game?.result?.awayTeamScore} (${game?.result?.homeTeamPenalties} - ${game?.result?.awayTeamPenalties})`}
        </Typography>
        <Typography
          sx={{
            color: "white",
            backgroundColor: "#1976d3",
            width: "100px",
            borderRadius: "5px",
            margin: "10px",
          }}
        >
          Points: 3
        </Typography>
      </Box>
    </Card>
  );
};

export default UserResultCard;
