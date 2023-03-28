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
import { Box, width } from "@mui/system";
import { useMediaQuery } from "@mui/material";

const Matches = () => {
  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState(availableTeams);
  const [stadiums, setStadiums] = useState(availableStadiums);
  const [matches, setMatches] = useState(JSON.parse(localStorage.getItem("matches")) || []);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleAddMatch = (newMatch) => {
    setMatches([...matches, newMatch]);
    setTeams(
      teams.filter(
        (team) =>
          team.id !== newMatch.homeTeam.id && team.id !== newMatch.awayTeam.id
      )
    );
    setStadiums(
      stadiums.filter((stadium) => stadium.id !== newMatch.stadium.id)
    );
    localStorage.setItem(
      "matches",
      JSON.stringify([...matches, newMatch])
    );
  };

  const handleEditMatch = (match) => {
    // Para editar el partido
  };

  const handleDeleteMatch = (match) => {
    const newMatches = matches.filter((m) => m !== match);
    setMatches(newMatches);
    const existingHomeTeam = teams.find((team) => team.id === match.homeTeam.id);
    const existingAwayTeam = teams.find((team) => team.id === match.awayTeam.id);
    const existingStadium = stadiums.find((stadium) => stadium.id === match.stadium.id);
    const newTeams = existingHomeTeam && existingAwayTeam
      ? teams // Si ambos equipos ya estaban en la matriz, no se hace nada
      : [...teams, match.homeTeam, match.awayTeam];
    const newStadiums = existingStadium
      ? stadiums // Si el estadio ya estaba en la matriz, no se hace nada
      : [...stadiums, match.stadium];
    setTeams(newTeams);
    setStadiums(newStadiums);
    localStorage.setItem("matches", JSON.stringify(newMatches));
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
    setMatches(newMatches);
    localStorage.setItem("matches", JSON.stringify(newMatches));
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
    <Box sx={{ width: "100%", minWidth: isMobile ? "400px" : "auto"}}>
      <p  style={{ textAlign: "center" }}> First stage matches : {matches.length}</p>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ width: "145px", marginBottom: "10px" }}
        >
          Create Match
        </Button>
        <Button
          variant="contained"
          onClick={() => handleRandomMatches(32)}
          sx={{
            width: "240px",
            margin: isMobile ? "0 10px 0 0" : "0 0 10px 10px",
          }}
        >
          Create Random Matches
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>Order</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Date</TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  display: isMobile ? "none" : "static",
                }}
              >
                Hour
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>Home Team</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Away Team</TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  display: isMobile ? "none" : "static",
                }}
              >
                Stadium
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  display: isMobile ? "none" : "static",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((match, i) => (
              <TableRow key={i + 1}>
                <TableCell sx={{ textAlign: "center" }}>{i + 1}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {format(new Date(match.date), "dd/MM/yyyy")}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    display: isMobile ? "none" : "static",
                  }}
                >
                  {match.time}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {isMobile ? match.homeTeam.shortName : match.homeTeam.nombre}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {isMobile ? match.awayTeam.shortName : match.awayTeam.nombre}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    display: isMobile ? "none" : "static",
                  }}
                >
                  {match.stadium.nombre}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    display: isMobile ? "none" : "static",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleEditMatch(match)}
                    sx={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteMatch(match)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Match</DialogTitle>
        <DialogContent>
          <AddMatchCard
            onAddMatch={handleAddMatch}
            teams={teams}
            stadiums={stadiums}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Matches;
