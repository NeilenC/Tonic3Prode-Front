import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Select, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
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
  const stages = ["32", "16", "8", "4", "2", "1"];
  //const [stage, setStage] = useState("");

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

  ////// SE TRAEN LOS GAMES DE LOS SIGUIENTES STAGE (NO ESTA CONFIGURADO) ////////////

  // useEffect(() => {
  //   if (stage) {
  //     axios
  //       .get(`http://localhost:3001/api/games/search/${id}`)
  //       .then((allgames) => {
  //         return allgames;
  //       })
  //       .then((allgames) => {
  //         const games = allgames.data.filter(
  //           (item) => item.status === "pending" && item.stage === "stage"
  //         );
  //         console.log("stagedgames", games);
  //         setGames(games);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [stage]);

  //////////////// STAGE  SELECT///////////////////
  const handleStageChange = (e) => {
    setStage(e.target.value);
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

  //////////////// ENVIO DE PREDICCIONES AL BACK ///////////////

  const predictions = games.map((item) => {
    if (scores) {
      return {
        gameId: item._id,
        prediction: {
          homeTeam: item.teams[0].name,
          awayTeam: item.teams[1].name,
          homeTeamScore: scores[item._id]?.team1Score || "",
          awayTeamScore: scores[item._id]?.team2Score || "",
        },
        status: scores[item._id]?.team1Score && scores[item._id]?.team2Score ? "pre_match" : "pending"
      };
    }
  });

  //////////Objeto para el update//////////
  const updatePredictions = games.map((item) => {
    return {
      gameId: item.id

    }
  })
  
  const sendPredictions = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/predictions/create/${user}`,
        predictions
      );
      toast.success("You Successfully create your predictions !");
    } catch (error) {
      console.error(error);
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
          onChange={handleStageChange}
          variant="outlined"
          size="small"
          sx={{ marginTop: "20px" }}
        >
          {games.map((item, i) => (
            <MenuItem key={i} value={item}>
              {item.date}
            </MenuItem>
          ))}
        </Select>

        <Button
          onClick={() => sendPredictions()}
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
          onSubmit={sendPredictions}
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
          {games.map((item) => (
            <>
              {item.status == "pending" ? (
                <Box>
                  <PredictionCards
                    item={item}
                    handleScoreChange={handleScoreChange}
                    user={user} id={id}
                  />
                </Box>
              ) : (
                ""
              )}
            </>
          ))}
        </form>
        <Button
          onClick={() => sendPredictions()}
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
