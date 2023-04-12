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
import {
  changeHour,
  formattedDate,
  formattedTime,
} from "../../../../utils/functions";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import PredictionCards from "@/commons/PredictionCards";
import UserResultCard from "@/commons/UserResultCard";

// COMPONENTE
const Predictions = () => {
  const router = useRouter();
  const [games, setGames] = useState([]);
  const [closedGames, setClosedGames] = useState([]);
  const [scores, setScores] = useState({});
  const [user, setUser] = useState("");
  const [id, setId] = useState("");
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  ////////////////// (FUNCIONA) //////////////////////
  const handleScoreChange = (_id, team, score) => {
    setScores((prevState) => ({
      ...prevState,
      [_id]: {
        ...prevState[_id],
        [team]: score,
      },
    }));
  };

  //////////// ID DEL TORNEO /////////////////
  useEffect(() => {
    if (router.query.id) {
      setId(router.query.id);
    }
  }, [router.query.id]);

  //////////// SE TRAEN LOS PARTIDOS DEL TORNEO SELECCIONADO /////////////////
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

  ////////// SE OBTIENE EL SCORE DEL LS //////////////
  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  ///////// SE AGREGA EL SCORE EN EL LS ////////////
  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  ///////////////////// SE TRAE EL UID DEL USER DESDE EL LS /////////////
  useEffect(() => {
    setUser(localStorage.getItem("uid"));
  }, []);

  //// Actualizacion de la prediccion /////

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
            scores[game._id]?.homeTeamScore != "" && // Hay que arreglar esto
            scores[game._id]?.awayTeamScore != ""
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
    predictions: "predictions",
    results: "results",
  };

  /////////// COMIENZO DEL COMPONENTE //////////////////
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px",
            alignItems: "center",
            marginTop: "20px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Button
            sx={{ marginRight: "10px" }}
            onClick={() => changeActualComponent("predictions")}
          >
            Predictions
          </Button>
          <Button
            sx={{ marginRight: "10px" }}
            onClick={() => changeActualComponent("results")}
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
        {actualComponent === "predictions" ? (
          <Box sx={{ display: "flex", flexDirection: "column"}}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",    
              }}
            >
              <Typography sx={{ textAlign: "center" }}>
                Sin Predicción
              </Typography>
              <Paper
                sx={{
                  backgroundColor: "#1976d3",
                  p: 1.5,
                  margin: "10px",
                  borderRadius: "5px",
                }}
              ></Paper>
              <Typography sx={{ textAlign: "center" }}>
                Con Predicción
              </Typography>
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
              endIcon={<SportsSoccerIcon />}
              sx={{
                textAlign: "center",
                width: "auto",
                height: "1.5%",
                margin: "20px 0 20px 0",
              }}
            >
              Guardar Predicciones
            </Button>
            <Box onSubmit={updatePredictions}>
              {games.map((game) => {
                return (
                  <div key={game.id}>
                    <PredictionCards
                      game={game}
                      handleScoreChange={handleScoreChange}
                      user={user}
                      id={id}
                    />
                  </div>
                );
              })}
            </Box>
          </Box>
        ) : (
          <Box sx={{display: "flex", flexDirection: "column", alignItems:"center"}}>
            <FormControl fullWidth>
              <InputLabel id="select-option-label">
                Stage
              </InputLabel>
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
              {closedGames.map((game) => {
                return (
                  <div key={game.id}>
                    <UserResultCard
                      game={game}
                      handleScoreChange={handleScoreChange}
                      user={user}
                      id={id}
                    />
                  </div>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Predictions;
