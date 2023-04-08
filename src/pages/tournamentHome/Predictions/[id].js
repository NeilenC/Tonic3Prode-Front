import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Select, MenuItem, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
// import PredictionCards from "@/commons/predictionCards";
import { ConstructionOutlined } from "@mui/icons-material";

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


  ////Comparando el id del game que pertecene a una prediccion, con el id del game que pasan por item ////

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

  // const actualizarPredictions = async () => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:3001/api/predictions/${user}`,
  //       predictions
  //     );
  //     toast.success("You Successfully updated your predictions !");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
          //onClick={() => sendPredictions()}
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
          //onSubmit={sendPredictions}
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
                    //handleScoreChange={handleScoreChange}
                    user={user}
                    id={id}
                  />
                </div>
              );
            })}
          </>
        </form>
        <Button
          //onClick={() => sendPredictions()}
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
