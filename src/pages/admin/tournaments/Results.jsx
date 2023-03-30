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
import styles from "../../../styles/admin/newTournament/Results.module.css";
//import { FormattedMessage } from "react-intl";
import axios from "axios";
import { useSelector } from "react-redux";

const Results = () => {
  const [games, setGames] = React.useState([]);
  const [stage, setStage] = React.useState("");
  const [type, setType] = React.useState(true);
  const uid = localStorage.getItem("uid");

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
          <Typography variant="h5">Cargar partidos</Typography>
        </div>
      </CardContent>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() => setType(!type)}
          style={{ marginBottom: "10px", width: "100%" }}
        >
          {type ? "Single-elimination" : "Knockout"}
        </Button> 
        <Button
          variant="contained"
          style={{ marginBottom: "10px", width: "100%" }}
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
            marginBottom: "10px",
            width: "100%",
          }}
        />
        <Button
          variant="contained"
          onClick={() => handleSubmit()}
          style={{ marginBottom: "10px", width: "100%" }}
        >
          Guardar resultados
        </Button>
      </div>
      <CardContent className={styles.global}>
        <div className={styles.title} style={{ fontSize: "20px" }}>
          <Typography variant="h5">Etapa seleccionada</Typography>
        </div>
      </CardContent>

      {games.map((item, i) => (
        <Box
          key={item._id}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: 2,
          }}
          style={{
            marginBottom: i !== games.length - 1 ? "50px" : "0",
            border: "1px solid black",
            padding: "10px",
            borderRadius: "25px",
            backgroundColor: "lightblue",
            width: "100%",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", width: "100%" }}
            style={{
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <img
              src={item.teams[0].logo_url}
              alt={item.teams[0].name}
              style={{ width: "25%", maxWidth: "100px", marginRight: "10px" }}
            />
            <span
              style={{
                fontSize: "80%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                width: "25%",
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
              style={{ width: "25%" }}
            />

            <span style={{ width: "25%", textAlign: "center" }}> VS </span>

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
              style={{ width: "25%" }}
            />
            <span
              style={{
                fontSize: "80%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                width: "25%",
              }}
            >
              {item.teams[1].shortName}
            </span>
            <img
              src={item.teams[1].logo_url}
              alt={item.teams[1].name}
              style={{ width: "25%", maxWidth: "100px", marginLeft: "10px" }}
            />
          </Box>
          <span
            style={{
              fontSize: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              width: "25%",
              textAlign: "center",
              wordWrap: "break-word",
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