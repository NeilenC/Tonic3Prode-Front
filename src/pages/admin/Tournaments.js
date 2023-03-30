import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    async function searchTournaments() {
      const response = await axios.get(
        "http://localhost:3001/api/tournaments/"
      );
      return response.data;
    }
    searchTournaments().then((data) => setTournaments(data));
  }, []);

  return (
    <div>Tournaments</div>
  )
}

export default Tournaments