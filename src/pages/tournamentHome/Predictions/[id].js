import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Select,
  MenuItem,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
} from "@mui/material";

import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import PredictionCards from "@/commons/PredictionCards";
import { useIntl } from "react-intl";
import Countdown from "./Countdown";
import UserResultCard from "@/commons/UserResultCard";
import {
  SportsSoccer,
  Money,
  Save
} from "@mui/icons-material";

// COMPONENTE
const Predictions = () => {
  const router = useRouter();
  const [games, setGames] = useState([]);
  const [closedGames, setClosedGames] = useState([]);
  const [scores, setScores] = useState({});
  const [user, setUser] = useState("");
  const [id, setId] = useState("");
  const intl = useIntl();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [dates, setDate] = useState([]);
  const [formatedDate, setFormatedDate] = useState([]);
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
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const newFormattedDates = [];

  // SE OBTIENE EL SCORE DEL LS
  // SE TRAE EL UID DEL USER DESDE EL LS
  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
    setUser(localStorage.getItem("uid"));
  }, []);

  useEffect(() => {
    if (router.query.id) {
      setId(router.query.id);
    }
  }, [router.query.id]);

  // SE TRAEN LOS PARTIDOS DEL TORNEO SELECCIONADO Y SE FILTRAN LOS PENDIENTES
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/api/games/search/${id}/${user}`)
        .then((allgames) => {
          return allgames;
        })
        .then((allgames) => {
          const games = allgames.data.filter(
            (item) => item.status === "pending"
          );
          localStorage.setItem("games", JSON.stringify(games));
          setGames(games);
          const closedGames = allgames.data.filter(
            (item) => item.status === "closed"
          );
          setClosedGames(closedGames);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  // SE AGREGA EL SCORE EN EL LS
  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    const newDates = [];

    games.forEach((game, i) => {
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

      newDates[i] = date;
      newFormattedDates[i] = formattedDate.toLocaleString();
    });

    setDate(newDates);
    setFormatedDate(newFormattedDates);
  }, [games]);

  const handleScoreChange = (_id, team, score) => {
    setScores((prevState) => ({
      ...prevState,
      [_id]: {
        ...prevState[_id],
        [team]: score,
      },
    }));
  };
  const updatePredictions = async () => {
    let newPredictions = games?.map((game) => {
      if (scores) {
        return {
          userId: user,
          gameId: game?._id,
          prediction: {
            homeTeamScore:
              scores[game._id]?.homeTeamScore != ""
                ? parseInt(scores[game._id]?.homeTeamScore)
                : scores[game._id]?.homeTeamScore,
            awayTeamScore:
              scores[game._id]?.awayTeamScore != ""
                ? parseInt(scores[game._id]?.awayTeamScore)
                : scores[game._id]?.awayTeamScore,
          },
          status:
            typeof scores[game._id]?.homeTeamScore == "number" &&
            typeof scores[game._id]?.awayTeamScore == "number"
              ? "pre_match"
              : "pending",
        };
      }
    });

    try {
      const response = await axios.put(
        `http://localhost:3001/api/predictions/${user}`,
        newPredictions
      );
      toast.success("You Successfully updated your predictions !");
    } catch (error) {
      console.log(error);
    }
    window.location.href = `http://localhost:3000/tournamentHome/Predictions/${id}`;
  };

  const [actualComponent, setActualComponent] = useState("predictions");

  const changeActualComponent = (componente) => {
    setActualComponent(componente);
  };

  const components = {
    predictions: "",
    results: "",
  };

  /// COMIENZO DEL COMPONENTE ///

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          mt: "10px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "10px",
            alignItems: "center",
            marginTop: "20px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Button
            sx={{ mr: "10px", mb:"10px"}}
            onClick={() => changeActualComponent("predictions")}
            endIcon={<SportsSoccer />}
            variant="outlined"
          >
            Predictions
          </Button>
          <Button
            sx={{ mr: "10px", mb:"10px", width:"150px" }}
            onClick={() => changeActualComponent("results")}
            endIcon={<Money />}
            variant="outlined"
          >
            Results
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {actualComponent && components[actualComponent]}
        </Box>
      </Box>
      {actualComponent === "predictions" ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems:"center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ textAlign: "center" }}>load your prediction</Typography>
            <Paper
              sx={{
                backgroundColor: "#1976d3",
                p: 1.5,
                margin: "10px",
                borderRadius: "5px",
              }}
            ></Paper>
            <Typography sx={{ textAlign: "center" }}> prediction loaded</Typography>
            <Paper
              sx={{
                backgroundColor: "#e0e0e0",
                p: 1.5,
                margin: "10px",
                borderRadius: "5px",
              }}
            ></Paper>
          </Box>
          <Button
            onClick={() => updatePredictions()}
            variant="contained"
            endIcon={<Save />}
            sx={{
              textAlign: "center",
              width: "auto",
              height: "1.5%",
              margin: "20px 0 20px 0",
            }}
          >

               {intl.formatMessage({ id: "savepred" })}

          </Button>
          <Box onSubmit={updatePredictions}>
            {games?.map((game, i) => {
              return (
                <div key={game.id}>
                  <PredictionCards
                    game={game}
                    handleScoreChange={handleScoreChange}
                    user={user}
                    id={id}
                    dates={dates}
                    order={i}
                    currentDate={formatedDate}
                  />
                </div>
              );
            })}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormControl sx={{width:"250px", mb:"25px"}}>
            <InputLabel id="select-option-label">Stage</InputLabel>
            <Select
              labelId="select-option-label"
              id="select-option"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={32}>32</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
          </FormControl>
          <Box onSubmit={updatePredictions}>
            {closedGames
              .filter(
                (game) => selectedOption == 0 || game.stage == selectedOption
              )
              .map((game, i) => {
                return (
                  <div key={game.id}>
                    <UserResultCard
                      game={game}
                      handleScoreChange={handleScoreChange}
                      user={user}
                      id={id}
                      currentDate={formatedDate}
                      order={i}
                    />
                  </div>
                );
              })}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Predictions;
