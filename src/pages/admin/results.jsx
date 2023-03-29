import React from "react";
import { useEffect } from "react";
import { CardContent, Typography, Box, TextField, Button } from "@mui/material";
import styles from "../../styles/admin/newTournament/Results.module.css";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import { Butterfly_Kids } from "next/font/google";
import { useSelector } from "react-redux";
import { fontWeight } from "@mui/system";

const Results = () => {
  const [games, setGames] = React.useState([]);
  const [stage, setStage] = React.useState("");
  const [result, setResult] = React.useState([]);
  const [type, setType] = React.useState(true);
   const uid = useSelector((state) => state.uid);

  useEffect(() => {
    axios.get("http://localhost:3001/api/games")
      .then((allgames) => {
        return allgames
      }).then((allgames)=> {
        const games = allgames.data.filter((item) => item.stage === "32");
        setGames(games)
        console.log(games)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleScoreChange = (index, teamIndex, e) => {
    const updatedGames = [...games];
    updatedGames[index].teams[teamIndex].score = e.target.value;
    setGames(updatedGames);
  };

  const handleSubmit = () => {
    const newResult = games.map((game) => ({
      gameId: game._id,
      homeTeam: game.teams[0].name,
      awayTeam: game.teams[1].name,
      homeTeamScore: game.teams[0].score,
      awayTeamScore: game.teams[1].score,
      winner:
        game.teams[0].score > game.teams[1].score
          ? game.teams[0].name
          : game.teams[0].score < game.teams[1].score
          ? game.teams[1].name
          : "Tie",
    }
    )
 
    );
    setResult(newResult);
    console.log(result)
    console.log(uid);

    axios.put("http://localhost:3001/api/games/admin", {
      uid: uid,
      result: result,
    });
  };

  return (
    <>
      <CardContent className={styles.global}>
        <div className={styles.title}>
          <Typography variant="h5">
            <FormattedMessage id="Cargar partidos" />
          </Typography>
        </div>
      </CardContent>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() => setType(!type)}
          style={{ marginRight: "10px" }}
        >
          {type ? "Single-elimination" : "Knockout"}
        </Button>
        <Button variant="contained" style={{ marginRight: "10px" }}>
          ETAPA:
        </Button>
        <TextField
          label="Etapa"
          variant="outlined"
          size="small"
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <Button variant="contained" onClick={() => handleSubmit()}>
          Guardar resultados
        </Button>
      </div>
      <CardContent className={styles.global}>
        <div className={styles.title}>
          <Typography variant="h5">
            <FormattedMessage id="ETAPA SELECCIONADA" />
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
          }}
        >
          <span
            style={{
              fontSize: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              padding: "0 10px",
            }}
          >
            EMPATE
          </span>
          <img
            src={item.teams[0].logo_url}
            alt={item.teams[0].name}
            style={{ width: "5%" }}
          />
          <span
            style={{
              fontSize: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            {item.teams[0].shortName}
          </span>
          <TextField
            label="Resultado"
            variant="outlined"
            size="small"
            value={item.teams[0].score}
            onChange={(e) => handleScoreChange(i, 0, e)}
            style={{
              margin: "0 10px",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          />
          <span> VS </span>

          <TextField
            label="Resultado"
            variant="outlined"
            size="small"
            value={item.teams[1].score}
            onChange={(e) => handleScoreChange(i, 1, e)}
            style={{
              margin: "0 10px",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          />
          <span
            style={{
              fontSize: "90%",
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
              fontSize: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              padding: "0 10px",
            }}
          >
            EMPATE
          </span>
        </Box>
      ))}
    </>
  );
};

export default Results