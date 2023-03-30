import React from "react";
import { useEffect } from "react";
import {
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  InputBase,
} from "@mui/material";
import styles from "../../styles/admin/newTournament/Results.module.css";
//import { FormattedMessage } from "react-intl";
import axios from "axios";
import { useSelector } from "react-redux";

const Results = () => {
  const [games, setGames] = React.useState([]);
  const [stage, setStage] = React.useState("");
  const [type, setType] = React.useState(true);
  const uid = useSelector((state) => state.uid);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/games")
      .then((allgames) => {
        return allgames;
      })
      .then((allgames) => {
        const games = allgames.data.filter((item) => item.stage === "32");
        setGames(games);
        console.log(games);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleScoreChange = (index, teamIndex, e) => {
    if (e.target.value) {
      console.log(e.target.value);
      const updatedGames = [...games];
      updatedGames[index].teams[teamIndex].score = parseInt(e.target.value);
      setGames(updatedGames);
    } else {
      const updatedGames = [...games];
      updatedGames[index].teams[teamIndex].score = "pending";
      setGames(updatedGames);
    }
  };

  const handleSubmit = async () => {
    const newResult = await Promise.all(
      games.map(async (game) => ({
        gameId: game._id,
        homeTeam: game.teams[0].name,
        awayTeam: game.teams[1].name,
        homeTeamScore: game.teams[0].score,
        awayTeamScore: game.teams[1].score,
        winner:
          game.teams[0].score > game.teams[1].score
            ? game.teams[0].name
            : game.teams[1].name,
      }))
    );

    console.log("mando al back", {
      uid: uid,
      results: newResult,
    });

    axios
      .put("http://localhost:3001/api/games/admin", {
        uid: uid,
        results: newResult,
      })
      .then((response) => {
        console.log(response);
        location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <CardContent className={styles.global}>
        <div className={styles.title}>
          <Typography variant="h5">
            Cargar partidos
          </Typography>
        </div>
      </CardContent>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          onClick={() => setType(!type)}
          style={{ marginRight: "10px", marginBottom: "10px" }}
        >
          {type ? "Single-elimination" : "Knockout"}
        </Button>
        <Button
          variant="contained"
          style={{ marginRight: "10px", marginBottom: "10px" }}
        >
          ETAPA:
        </Button>
        <TextField
          label="Etapa"
          variant="outlined"
          size="small"
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          style={{
            marginRight: "10px",
            marginBottom: "10px",
            alignContent: "center",
          }}
        />
        <Button
          variant="contained"
          onClick={() => handleSubmit()}
          style={{ marginBottom: "10px" }}
        >
          Guardar resultados
        </Button>
      </div>
      <CardContent className={styles.global}>
        <div className={styles.title} style={{ fontSize: "20px" }}>
          <Typography variant="h5">
           Etapa seleccionada
          </Typography>
        </div>
      </CardContent>

      {games.map((item, i) => (
        <Box
          key={item._id}
          sx={{ display: "flex", alignItems: "center", my: 2 }}
          style={{
            marginBottom: i !== games.length - 1 ? "50px" : "0",
            display: "flex",
            alignItems: "center",
            border: "1px solid black",
            padding: "10px",
            justifyContent: "space-between",
            borderRadius: "25px",
            backgroundColor: "lightblue",
            marginRight: "50px",
            marginLeft: "50px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              padding: "0 10px",
            }}
          >
            {item.result.length > 0
              ? (item.result[0].winner === item.teams[0].name && (
                  <span style={{ color: "green" }}>GANADOR</span>
                )) ||
                (item.result[0].winner === item.teams[1].name && (
                  <span style={{ color: "red" }}>PERDEDOR</span>
                ))
              : "SIN DEFINIR"}
          </span>
          <img
            src={item.teams[0].logo_url}
            alt={item.teams[0].name}
            style={{ width: "5%" }}
          />
          <span
            style={{
              fontSize: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            {item.teams[0].shortName}
          </span>
          <InputBase
            placeholder=""
            inputProps={{
              "aria-label": "score",
              min: "0",
              type: "number",
              style: {
                width: "80px",
                borderRadius: "8px",
                backgroundColor: "white",
                padding: "10px",
                textAlign: "center",
                fontSize: "14px",
              },
            }}
            value={item.teams[0].score}
            onChange={(e) => handleScoreChange(i, 0, e)}
          />

          <span> VS </span>

          <InputBase
            placeholder=""
            inputProps={{
              min: "0",
              type: "number",
              "aria-label": "score",
              style: {
                width: "80px",
                borderRadius: "8px",
                backgroundColor: "white",
                padding: "10px",
                textAlign: "center",
                fontSize: "14px",
              },
            }}
            value={item.teams[1].score}
            onChange={(e) => handleScoreChange(i, 1, e)}
          />
          <span
            style={{
              fontSize: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            {item.teams[1].shortName}
          </span>
          <img
            src={item.teams[1].logo_url}
            alt={item.teams[1].name}
            style={{ width: "5%" }}
          />
          <span
            style={{
              fontSize: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              padding: "0 10px",
            }}
          >
            {item.result.length > 0
              ? (item.result[0].winner === item.teams[0].name && (
                  <span style={{ color: "red" }}>PERDEDOR</span>
                )) ||
                (item.result[0].winner === item.teams[1].name && (
                  <span style={{ color: "green" }}>GANADOR</span>
                ))
              : "SIN DEFINIR"}
          </span>
        </Box>
      ))}
    </>
  );
};

export default Results;
