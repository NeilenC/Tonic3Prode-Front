import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Select, MenuItem, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import PredictionCards from "@/commons/predictionCards";
import { ConstructionOutlined, CreditScoreSharp } from "@mui/icons-material";

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
  // console.log("VERIFICANDO QUE SE GUARDE EN SCORE", scores);
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
    console.log("Puntuaciones a enviar",scores)
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
          scores[game._id]?.homeTeamScore && scores[game._id]?.awayTeamScore != ''
            ? "pre_match"
            : "pending",
      };
    }
  });

  const updatePredictions = async () => {
    console.log("ENTRO EN UPDATE");
    try {
      const response = await axios.put(
        `http://localhost:3001/api/predictions/${user}`,
        newPredictions
      );
      //toast.success("You Successfully updated your predictions !");
      alert("You Successfully updated your predictions !");
    } catch (error) {
      console.log(error);
    }
  };

  /////////// COMIENZO DEL COMPONENTE //////////////////
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Select
          labelId="stage-select-label"
          id="stage-select"
          //value={stage}
          //onChange={handleStageChange}
          variant="outlined"
          size="small"
          sx={{ marginTop: "20px" }}
        >
          {games?.map((item, i) => (
            <MenuItem key={i}>{item.date}</MenuItem>
          ))}
        </Select>

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
            {games?.map((game) => {
              return (
                <div key={game.id}>
                  <h3>{game.date}</h3>
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
