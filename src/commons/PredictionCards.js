import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { changeHour } from "../../utils/functions";
import { Box, Typography, Button } from "@mui/material";
import { IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import styles from "../styles/commons/predictionCards.module.css";

const PredictionCards = ({ item, handleScoreChange, user, id }) => {
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [userPredictions, setUserPredictios] = useState([]);

  const handleTeam1Increment = () => {
    if (team1Score <= 30) {
      setTeam1Score(team1Score + 1);
    }
  };

  const handleTeam1Decrement = () => {
    if (team1Score >= 0) {
      setTeam1Score(team1Score - 1);
    }
  };

  const handleTeam2Increment = () => {
    if (team2Score <= 30) {
      setTeam2Score(team2Score + 1);
    }
  };

  const handleTeam2Decrement = () => {
    if (team2Score >= 0) {
      setTeam2Score(team2Score - 1);
    }
  };

  useEffect(() => {
    handleScoreChange(item._id, "team1Score", team1Score);
    handleScoreChange(item._id, "team2Score", team2Score);
  }, [team1Score, team2Score]);

  ////Filtar todos las predicciones segun el id del torneo de cada usuario //////
  // Si hay un partido que no tiene predicciones, mandar un { "" } ////
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
  }, []);

  console.log(userPredictions);
  //// Actualizacion de la prediccion /////

  // const updatePredictions = userPredictions?.map((item) => {
  //   return (
  //     {
  //       gameId: gameId._id,
  //       userId: userId._id,
  //     },
  //     {
  //       predictions: {
  //         awayTeamScore,
  //         homeTeamScore,
  //       },
  //       status,
  //     }
  //   );
  // });

  const actualizarPredictions = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/predictions/${user}`,
        predictions
      );
      toast.success("You Successfully updated your predictions !");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      key={item._id}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "400px",
        gap: "10px",
        p: "40px",
        margin: "10px",
        backgroundColor: "#fcfcfc",
        flexDirection: "column",
        borderRadius: "15px",
      }}
      className={styles.numberInput}
    >
      <Button variant="text">Submit prediction change </Button>
      {/* MODIFICAR */}
      <Typography>{changeHour(item.hour)}</Typography>
      {item.result[0] ? (
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
            {item.result[0]?.awayTeamScore} - {item.result[0]?.homeTeamScore}
          </Box>
        </Box>
      ) : (
        ""
      )}
      <Box sx={{ alignItems: "center", gap: "1px" }}>
        {" "}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={item.teams[0].logo_url}
            alt={item.teams[0].name}
            style={{ width: "30px", height: "30px" }}
          />
          <span style={{ fontSize: "90%", display: "inline-block" }}>
            {item.teams[0].shortName}
          </span>
        </div>
        <div style={{ flexDirection: "column" }}>
          {item.status != "close" ? (
            <IconButton aria-label="increment" onClick={handleTeam1Increment}>
              <Add />
            </IconButton>
          ) : (
            ""
          )}

          <input
            type="number"
            min="0"
            max="30"
            pattern="[0-9]|[1-2][0-9]|30"
            className={styles.input}
            value={team1Score || ""}
            onChange={(e) => {
              handleScoreChange(item._id, "team1Score", e.target.value);
              setStyle(true);
            }}
          />
          {item.status != "close" ? (
            <IconButton aria-label="decrement" onClick={handleTeam1Decrement}>
              <Remove />
            </IconButton>
          ) : (
            ""
          )}
        </div>
      </Box>
      <span> Vs </span>
      <Box sx={{ alignItems: "center", gap: "1px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {item.status != "close" ? (
            <IconButton aria-label="increment" onClick={handleTeam2Increment}>
              <Add />
            </IconButton>
          ) : (
            ""
          )}
          <input
            type="number"
            min="0"
            max="30"
            pattern="[0-9]|[1-2][0-9]|30"
            className={styles.input}
            value={team2Score || ""}
            onChange={(e) => {
              handleScoreChange(item._id, "team2Score", e.target.value);
              setStyle(true);
            }}
          />
          {item.status != "close" ? (
            <IconButton aria-label="decrement" onClick={handleTeam2Decrement}>
              <Remove />
            </IconButton>
          ) : (
            ""
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={item.teams[1].logo_url}
              alt={item.teams[1].name}
              style={{ width: "30px", height: "30px" }}
            />
            <span style={{ fontSize: "90%", display: "inline-block" }}>
              {item.teams[1].shortName}
            </span>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default PredictionCards;
