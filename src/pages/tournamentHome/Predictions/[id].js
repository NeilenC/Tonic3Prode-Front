import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import PredictionCards from "@/commons/PredictionCards";
import Countdown from "./Countdown";

const Predictions = () => {
  const router = useRouter();
  const [games, setGames] = useState([]);
  const [scores, setScores] = useState({});
  const [user, setUser] = useState("");
  const [id, setId] = useState("");
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
            {games.map((game, i) => {
              return (
                <div key={game.id}>
                  <div>{formatedDate[i]}</div>
                  <PredictionCards
                    game={game}
                    handleScoreChange={handleScoreChange}
                    user={user}
                    id={id}
                    dates={dates}
                    order={i}
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
