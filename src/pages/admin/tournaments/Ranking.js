import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import axios from 'axios';

const Ranking = () => {
  const  [rankings, setRankings] = useState([]);
  const router = useRouter();
  const tournamentId = router.query.id;
  const uid = localStorage.getItem("uid")

  useEffect(() => {
    console.log("ESTOY PIDIENDO ESTA RUTA")
    console.log("TournamentID", tournamentId)
    console.log("uid", uid)
    async function getTournamentRankings() {
      const response = await axios.get(`http://localhost:3001/api/rankings/search/${tournamentId}/${uid}`);
      setRankings (response.data)
      }
    getTournamentRankings();
  }, []);

  console.log("rankingssssssss", rankings)

  return (
    <div>Ranking</div>
  )
}

export default Ranking