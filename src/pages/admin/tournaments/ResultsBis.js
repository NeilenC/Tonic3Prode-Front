import React, { useEffect, useState } from 'react';
import PendingResultsTable from '@/commons/PendingResultsTable';
import { Box } from '@mui/material';
import { useRouter } from "next/router";
import axios from 'axios';
import customAxios from '../../../../utils/customAxios';

const GameTable = () => {
  const router = useRouter();
  const id = router.query.id;
  const [user, setUser] = useState("");
  const [pendingGames, setPendingGames] = useState([]); 
  const [completedGames, setCompletedGames] = useState([]);
  
useEffect(() => {
setUser(localStorage.getItem("uid"));

if (id) {
  customAxios
    .get(`http://localhost:3001/api/games/search/${id}`)
    .then((games) => {
      setPendingGames(games.data.filter(game => game.status === 'pending'))
      setCompletedGames(games.data.filter(game => game.status !== 'pending'))
    })
    .catch((error) => {
      console.error(error);
    });
}
}, [id]);

console.log("PENDING GAMES",pendingGames)
  return (
    <Box>
      <h1> Resultados pendientes</h1>
      {pendingGames.length > 0 && <PendingResultsTable gamesAdmin={pendingGames}/>}
      <h1> Resultados previos</h1>
      {completedGames.length > 0 && <PendingResultsTable gamesAdmin={completedGames}/>}
    </Box>
  )
};

export default GameTable;
