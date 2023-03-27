import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { format } from "date-fns";
import AddMatchCard from "@/commons/AddMatchCard";
import availableTeams from "@/fakeData/teams";
import availableStadiums from "@/fakeData/stadiums";

const Matches = () => {
  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState(availableTeams);
  const [stadiums, setStadiums] = useState(availableStadiums);
  const [matches, setMatches] = useState([]);

  const handleAddMatch = (newMatch) => {
    setMatches([...matches, newMatch]);
    setTeams(teams.filter((team) => team.id !== newMatch.homeTeam.id && team.id !== newMatch.awayTeam.id));
    setStadiums(stadiums.filter((stadium) => stadium.id !== newMatch.stadium.id));
  };

  const handleEditMatch = (match) => {
    // Para editar el partido
  };

  const handleDeleteMatch = (match) => {
    const newMatches = matches.filter((m) => m !== match);
    setMatches(newMatches);
    setTeams([...teams, match.homeTeam, match.awayTeam]);
    setStadiums([...stadiums, match.stadium]);
  };

  const handleRandomMatches = (cantidad = 32) => {
    let newMatches = [];
    let date = getRandomDate();
    let matchesPerDate = Math.floor(cantidad / 4);
    for (let i = 0; i < matchesPerDate; i++) {
      const usedTeamsIds = newMatches
        .map((match) => match.homeTeam.id)
        .concat(newMatches.map((match) => match.awayTeam.id));
      const usedStadiumsIds = newMatches.map((match) => match.stadium.id);
      const availableTeamsFiltered = teams.filter(
        (team) => !usedTeamsIds.includes(team.id)
      );
      const availableStadiumsFiltered = stadiums.filter(
        (stadium) => !usedStadiumsIds.includes(stadium.id)
      );
      for (let j = 0; j < 4; j++) {
        const homeTeam = getRandomTeam(availableTeamsFiltered);
        const awayTeam = getRandomTeam(
          availableTeamsFiltered.filter((team) => team.id !== homeTeam.id)
        );
        const stadium = getRandomStadium(availableStadiumsFiltered);
        const time = j > 1 ? "21:00" : "19:00";
        newMatches.push({
          date: date,
          time: time,
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          stadium: stadium,
        });
      }
      date = getRandomDate();
    }
    setMatches([...matches, ...newMatches]);
    setTeams([])
  };

  const getRandomTeam = (availableTeams) => {
    return availableTeams[Math.floor(Math.random() * availableTeams.length)];
  };

  const getRandomStadium = (availableStadiums) => {
    return availableStadiums[
      Math.floor(Math.random() * availableStadiums.length)
    ];
  };

  const getRandomDate = () => {
    const startDate = new Date("2023-01-01");
    const endDate = new Date("2023-12-31");
    const diff = endDate.getTime() - startDate.getTime();
    const randomDiff = Math.floor(Math.random() * diff);
    return new Date(startDate.getTime() + randomDiff);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Crear Partido
      </Button>
      <Button variant="contained" onClick={() => handleRandomMatches(32)}>
        Crear Partidos Aleatorios
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Crear Partido</DialogTitle>
        <DialogContent>
          <AddMatchCard
            onAddMatch={handleAddMatch}
            teams={teams}
            stadiums={stadiums}
          />
        </DialogContent>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Orden</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Local</TableCell>
              <TableCell>Visitante</TableCell>
              <TableCell>Estadio</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((match, i) => (
              <TableRow key={i + 1}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  {format(new Date(match.date), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>{match.time}</TableCell>
                <TableCell>{match.homeTeam.nombre}</TableCell>
                <TableCell>{match.awayTeam.nombre}</TableCell>
                <TableCell>{match.stadium.nombre}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEditMatch(match)}
                  >
                    Modificar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteMatch(match)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Matches;
