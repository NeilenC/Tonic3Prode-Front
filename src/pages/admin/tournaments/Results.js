import React from "react";
import { useEffect, useState } from "react";
import {
  CardContent,
  Typography,
  Box,
  Button,
  InputBase,
  Select,
  MenuItem,
} from "@mui/material";
import styles from "../../../styles/matches/ResultCard.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const Results = () => {
  const router = useRouter();
  const id = router.query.id;
  const [games, setGames] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const stages = ["32", "16", "8", "4", "2", "1"];
  const [stage, setStage] = useState("");
  const [type, setType] = React.useState(true);
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("uid"));

    if (id) {
      axios
        .get(`http://localhost:3001/api/games/search/${id}`)
        .then((allgames) => {
          return allgames;
        })
        .then((allgames) => {
          // console.log("allgames", allgames);
          const games = allgames.data.filter(
            (item) =>
              item.status === "pending" &&
              (item.stage === "32" || item.stage === "initial")
          );
          setGames(games);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (stage) {
      axios
        .get(`http://localhost:3001/api/games/search/${id}`)
        .then((allgames) => {
          return allgames;
        })
        .then((allgames) => {
          const games = allgames.data.filter(
            (item) => item.status === "pending" && item.stage === "stage"
          );
          console.log("stagedgames", games);
          setGames(games);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [stage]);

  const handleScoreChange = (index, teamIndex, e) => {
    if (e.target.value) {
      console.log(e.target.value);
      const updatedGames = [...results];
      updatedGames[index] = { ...games[index] };
      updatedGames[index].teams[teamIndex].score = parseInt(e.target.value);

      const uniqueGames = updatedGames.reduce((acc, current) => {
        if (!acc.find((item) => item._id === current._id)) {
          return acc.concat(current);
        } else {
          return acc;
        }
      }, []);
      console.log("uniqueGames", uniqueGames);
      setResults(uniqueGames);
    }
  };

  const handleStageChange = (e) => {
    setStage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = user;
    const newResult = await Promise.all(
      results.map(async (game) => ({
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
        toast.success("Your results haven been updated!");
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
        <>
          <Select
            labelId="stage-select-label"
            id="stage-select"
            value={stage}
            onChange={handleStageChange}
            variant="outlined"
            size="small"
            sx={{ marginTop: "20px" }}
          >
            {stages.map((s) => (
              <MenuItem key={s} value={s}>
                Etapa {s}
              </MenuItem>
            ))}
          </Select>
        </>
        <Button
          sx={{ marginTop: "20px" }}
          variant="contained"
          onClick={(e) => handleSubmit(e)}
        >
          Guardar resultados
        </Button>
      </Box>
      <Box>
        {games.map((item, i) => (
          <React.Fragment key={i}>
            <CardContent className={styles.customCard}>
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
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default Results;
