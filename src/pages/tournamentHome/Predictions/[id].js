import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Select, MenuItem, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import {
  changeHour,
  formattedDate,
  formattedTime,
} from "../../../../utils/functions";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import PredictionCards from "@/commons/predictionCards";


// COMPONENTE
const Predictions = () => {
  const router = useRouter();
  const [games, setGames] = useState([]);
  const [scores, setScores] = useState({});
  const [user, setUser] = useState("");
  const [id, setId] = useState("");

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

  let newPredictions = games?.map((game) => {
    console.log("Puntuaciones a enviar", scores);
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

  const updatePredictions = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/predictions/${user}`,
        newPredictions
      );
      toast.success("You Successfully updated your predictions !");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(games);
  /////////// COMIENZO DEL COMPONENTE //////////////////
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Button
          onClick={() => updatePredictions()}
          variant="contained"
          endIcon={<SportsSoccerIcon />}
          sx={{
            textAlign: "center",
            width: "auto",
            height: "1.5%",
            margin: "10px",
          }}
        >
          Guardar Predicciones
        </Button>
        <form
          onSubmit={updatePredictions}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "800px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <>
            {games
              ?.sort(
                (a, b) =>
                  new Date(
                    `${a.month}/${
                      a.dayOfTheMonth
                    }/${new Date().getFullYear()} ${a.hour}`
                  ) -
                  new Date(
                    `${b.month}/${
                      b.dayOfTheMonth
                    }/${new Date().getFullYear()} ${b.hour}`
                  )
              )
              .map((game) => {
                const date = new Date(
                  `${game.month}/${
                    game.dayOfTheMonth
                  }/${new Date().getFullYear()} ${changeHour(game.hour)}`
                );
                const gameDate = formattedDate(date);
                const hour = formattedTime(date);
                return (
                  <div key={game.id}>
                    <h5>
                      {gameDate} - {hour}
                    </h5>
                    <PredictionCards
                      game={game}
                      handleScoreChange={handleScoreChange}
                      user={user}
                      id={id}
                    />
                  </div>
                );
              })}
          </>
        </form>
        <Button
          onClick={() => updatePredictions()}
          variant="contained"
          endIcon={<SportsSoccerIcon />}
          sx={{
            textAlign: "center",
            width: "auto",
            height: "1.5%",
            margin: "15px",
          }}
        >
          Guardar Predicciones
        </Button>
      </Box>
    </>
  );
};

export default Predictions;
