import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const Ranking = () => {
  const [rankings, setRankings] = useState([]);
  const [filter, setFilter] = useState("");
  const router = useRouter();
  const tournamentId = router.query.id;
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    async function getTournamentRankings() {
      const response = await axios.get(
        `http://localhost:3001/api/rankings/search/${tournamentId}/${uid}`
      );
      const updatedRankings = response.data.map((ranking) => {
        const score = ranking.predictions.reduce(
          (acc, prediction) => acc + prediction.points,
          0
        );
        return {
          ...ranking,
          score,
        };
      });
      setRankings(updatedRankings);
    }
    getTournamentRankings();
  }, []);

  return (
    <div>
      <FormControl
        sx={{
          display: "flex",
          justifyContent: "center",
          minWidth: 120,
          marginBottom: 2,
        }}
      >
        <InputLabel id="country-filter-label">Filter by country:</InputLabel>
        <Select
          labelId="country-filter-label"
          id="country-filter"
          value={filter}
          label="Filtrar por país"
          onChange={(event) => setFilter(event.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Argentina">Argentina</MenuItem>
          <MenuItem value="Brasil">Brasil</MenuItem>
          <MenuItem value="EEUU">EEUU</MenuItem>
        </Select>
      </FormControl>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Postion</TableCell>
            <TableCell>UserName</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rankings
            .filter((ranking) => !filter || ranking.country === filter)
            .sort((a, b) => b.score - a.score)
            .map((ranking, index) => {
              console.log(ranking);
              return (
                <TableRow key={ranking._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{ranking.userId.username}</TableCell>
                  <TableCell>{ranking.country}</TableCell>
                  <TableCell>{ranking.score}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Ranking;
