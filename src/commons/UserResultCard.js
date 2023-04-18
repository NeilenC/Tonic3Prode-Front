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
   const [formatedDate, setFormatedDate] = useState([]);
   const [date, setDate] = useState([]);
   const monthNames = [
     "January",
     "February",
     "March",
     "April",
     "May",
     "June",
     "July",
     "August",
     "September",
     "October",
     "November",
     "December",
   ];

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

  console.log(game);
  console.log("game predictionn", gamePredictions[0]);

  useEffect(() => {
    const year = new Date().getFullYear();
    const month = game.month - 1;
    const day = game.dayOfTheMonth;
    const hour = Math.floor(game.hour / 100);
    const minute = game.hour % 100;
    const date = new Date(year, month, day, hour, minute);

    const amPm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedDate = `${
      monthNames[month]
    } ${day}, ${year} at ${formattedHour}:${minute
      .toString()
      .padStart(2, "0")} ${amPm}`;

    setDate(date);
    setFormatedDate(formattedDate);
  }, [game]);

  

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
          {formatedDate}
        </Typography>
      </Box>
      <Typography
        sx={{
          color: "black",
          mt: "10px",
        }}
      >
        Your prediction:
      </Typography>
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
            {game?.result?.winningTeam === game?.teams[0].name ? (
              <ImageFilter
                image={game?.teams[0]?.logo_url}
                alt={game?.teams[0]?.name}
                className={styles.teamLogo}
                // style={{
                //   width: "75px",
                //   height: "75px",
                //   objectFit: "contain",
                //   marginBottom: "10px",
                // }}
              />
            ) : (
              <ImageFilter
                image={game?.teams[0]?.logo_url}
                alt={game?.teams[0]?.name}
                className={styles.teamLogo}
                filter={"grayscale"}
                style={{
                  opacity: 0.4,
                  // width: "75px",
                  // height: "75px",
                  // objectFit: "contain",
                  // marginBottom: "10px",
                }}
              />
            )}
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
            {game?.result?.winningTeam === game?.teams[1].name ? (
              <ImageFilter
                image={game?.teams[1]?.logo_url}
                alt={game?.teams[1]?.name}
                className={styles.teamLogo}
                // style={{
                //   width: "75px",
                //   height: "75px",
                //   objectFit: "contain",
                //   marginBottom: "10px",
                // }}
              />
            ) : (
              <ImageFilter
                image={game?.teams[1]?.logo_url}
                alt={game?.teams[1]?.name}
                className={styles.teamLogo}
                filter={"grayscale"}
                style={{
                  opacity: 0.4,
                  // width: "75px",
                  // height: "75px",
                  // objectFit: "contain",
                  // marginBottom: "10px",
                }}
              />
            )}
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
          {gamePredictions[0]?.points
            ? `${gamePredictions[0]?.points} Points`
            : "0 Points"}
        </Typography>
      </Box>
    </Card>
  );
};

export default UserResultCard;
