import React, { useState, useEffect } from "react";
import axios from "axios";

async function getTeams() {
  try {
    const response = await axios.get("http://localhost:3001/api/games");
    return response.data
  } catch (error) {
    return [];
  }
}

const Predictions = ({ teams = []}) => {
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

  return (
    <div>
      {teams.map((item) => (
        <div key={item._id}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>{item.teams[0].name}</span>
            <input
              type="number"
              value={scores[item._id]?.team1Score || ""}
              onChange={(e) =>
                handleScoreChange(item._id, "team1Score", e.target.value)
              }
            />
            <span>-</span>
            <input
              type="number"
              value={scores[item._id]?.team2Score || ""}
              onChange={(e) =>
                handleScoreChange(item._id, "team2Score", e.target.value)
              }
            />
            <span>{item.teams[1].name}</span>
          </div>
        </div>
      ))}
    </div>
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