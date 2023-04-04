import React from "react";
import { useEffect, useState } from "react";
import {
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  InputBase,
} from "@mui/material";
import styles from "../../../styles/matches/ResultCard.module.css";
//import { FormattedMessage } from "react-intl";
import axios from "axios";
import { useSelector } from "react-redux";
import ResultCard from "@/commons/ResultCard";
import { useRouter } from "next/router";



const Results = () => {
  const router = useRouter();
  const [games, setGames] = React.useState([]);
  const [stage, setStage] = React.useState("");
  const [type, setType] = React.useState(true);
  const [user, setUser] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("uid"));
  }, []);

useEffect(() => {
  if (router.query.id) {
    setId(router.query.id);
  }
}, [router.query.id]);

useEffect(() => {
  console.log(id);
  if (id) {
    console.log(`http://localhost:3001/api/games/${id}`)
    axios
      .get(`http://localhost:3001/api/games/${id}`)
      .then((allgames) => {
        return allgames;
      })
      .then((allgames) => {
        console.log(allgames)
        const games = allgames.data.filter((item) => item.status === "pending");
        setGames(games);
        console.log(games);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}, [id]);


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
    const uid = user;
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
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Button
          sx={{ marginTop: "20px" }}
          variant="contained"
          onClick={() => setType(!type)}
        >
          {type ? "Single-elimination" : "Knockout"}
        </Button>
        <Button sx={{ marginTop: "20px" }} variant="contained">
          ETAPA:
        </Button>
        <TextField
          label="Etapa"
          variant="outlined"
          size="small"
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          sx={{ marginTop: "20px" }}
        />
        <Button
          sx={{ marginTop: "20px" }}
          variant="contained"
          onClick={() => handleSubmit()}
        >
          Guardar resultados
        </Button>
      </Box>
      <Box>
        {games.map((item, i) => (
          <>
            <CardContent className={styles.customCard} key={i}>
              <div className={styles.cardColumn}>
                <div className={styles.titleWrapper}>
                  <Typography
                    variant="subtitle1"
                    align="center"
                    className={styles.teamName}
                  >
                    {item.teams[0].shortName}
                  </Typography>
                </div>
              </div>
              <div className={styles.cardColumn}>
                <div className={styles.teamLogoWrapper}>
                  <img
                    src={item.teams[0].logo_url}
                    alt={item.teams[0].nombre}
                    className={styles.teamLogo}
                  />
                </div>
              </div>
              <InputBase
                className={styles.cardColumn}
                placeholder=""
                inputProps={{
                  "aria-label": "score",
                  min: "0",
                  type: "number",
                }}
                value={item.teams[0].score}
                sx={{
                  background: "white",
                  borderRadius: "5px",
                  border: "0.25px solid lightblue",
                }}
                onChange={(e) => handleScoreChange(i, 0, e)}
              />
              <div className={styles.cardColumn}>
                <div className="date-container">
                  <Typography
                    variant="subtitle1"
                    align="center"
                    className={styles.matchDate}
                  >
                    Vs.
                  </Typography>
                </div>
              </div>
              <InputBase
                className={styles.cardColumn}
                placeholder=""
                inputProps={{
                  "aria-label": "score",
                  min: "0",
                  type: "number",
                }}
                value={item.teams[1].score}
                sx={{
                  background: "white",
                  borderRadius: "5px",
                  border: "0.25px solid lightblue",
                }}
                onChange={(e) => handleScoreChange(i, 1, e)}
              />
              <div className={styles.cardColumn}>
                <div className={styles.teamLogoWrapper}>
                  <img
                    src={item.teams[1].logo_url}
                    alt={item.teams[1].nombre}
                    className={styles.teamLogo}
                  />
                </div>
              </div>
              <div className={styles.cardColumn}>
                <div className={styles.titleWrapper}>
                  <Typography
                    variant="subtitle1"
                    align="center"
                    className={styles.teamName}
                  >
                    {item.teams[1].shortName}
                  </Typography>
                </div>
                <div />
              </div>
            </CardContent>
          </>
        ))}
      </Box>
    </Box>
  );
};

export default Results;
