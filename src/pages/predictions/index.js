import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

async function getTeams() {
  try {
    const response = await axios.get("http://localhost:3001/api/games");
   
    return response.data;
  } catch (error) {
    return [];
  }
}

const Predictions = ({ teams = [] }) => {
  const [scores, setScores] = useState({});

  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  const handleScoreChange = (id, team, score) => {
    setScores((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [team]: score,
      },
    }));
  };

  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  if (!teams) return <div>Loading...</div>;
  // console.log("****************", teams);

  const uid = localStorage.getItem("uid")
  console.log(uid); 
  
  const sendPredictions = async (e) => {
    e.preventDefault();


    const predictions = teams.map((item) => {
      return {
        gameId: item._id,
        prediction: {
          homeTeam: item.teams[0].name,
          awayTeam: item.teams[1].name,
          homeTeamScore: scores[item._id]?.team1Score || 0,
          awayTeamScore: scores[item._id]?.team2Score || 0,
        },
      };
    });

    try {
      const response = await axios.post(`http://localhost:3001/api/predictions/${uid}`, predictions);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <form onSubmit={sendPredictions}>
        {teams.map((item) => (
          <Box
            key={item._id}
            sx={{ display: "flex", alignItems: "center", my: 2 }}
          >
            <img
              src={item.teams[0].logo_url}
              alt={item.teams[0].name}
              style={{ width: "4%" }}
            />
            <span style={{ fontSize: "90%", display: "inline-block" }}>
              {item.teams[0].shortName}
            </span>
            <TextField
              type="number"
              value={scores[item._id]?.team1Score || ""}
              onChange={(e) =>
                handleScoreChange(item._id, "team1Score", e.target.value)
              }
              sx={{ mx: 3, textAlign: "center", width: "10%", height: "1.5%" }}
            />
            <span>-</span>
            <TextField
              type="number"
              value={scores[item._id]?.team2Score || ""}
              onChange={(e) =>
                handleScoreChange(item._id, "team2Score", e.target.value)
              }
              sx={{ mx: 3, textAlign: "center", width: "10%", height: "1.5%" }}
            />
            <span style={{ fontSize: "90%", display: "inline-block" }}>
              {item.teams[1].shortName}
            </span>
            <img
              src={item.teams[1].logo_url}
              alt={item.teams[1].name}
              style={{ width: "4%" }}
            />
          </Box>
        ))}
        <Stack direction="row" spacing={2}>
          <Button variant="contained" endIcon={<SportsSoccerIcon />}>
            Guardar Predicciones
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export async function getServerSideProps() {
  const teams = await getTeams();
  return {
    props: {
      teams,
    },
  };
}

export default Predictions;
