import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
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
import { Box, width } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import axios from "axios";

const Matches = () => {
  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState(
    JSON.parse(localStorage.getItem("teams")) || []
  );
  const [matches, setMatches] = useState(
    JSON.parse(localStorage.getItem("matches")) || []
  );
  const isMobile = useMediaQuery("(max-width:600px)");
  const [editingMatch, setEditingMatch] = useState(null);

  const handleAddMatch = (newMatch) => {
    if (editingMatch) {
      const newMatches = matches.map((match) =>
        match === editingMatch ? { ...newMatch } : match
      );
      setMatches(newMatches);
      localStorage.setItem("matches", JSON.stringify(newMatches));
      setEditingMatch(null);
    } else {
      setMatches([...matches, newMatch]);
      localStorage.setItem("matches", JSON.stringify([...matches, newMatch]));
    }
    setOpen(false);
  };

  const handleEditMatch = (match) => {
    setEditingMatch(match);
    setOpen(true);
  };

  const handleDeleteMatch = (match) => {
    const newMatches = matches.filter((m) => m !== match);
    setMatches(newMatches);
    localStorage.setItem("matches", JSON.stringify(newMatches));
  };

  const handleCreateRandomMatches = () => {
    const startDate =  JSON.parse(localStorage.getItem("generalInfo")).beginning// fecha de inicio
    const endDate = JSON.parse(localStorage.getItem("generalInfo")).finishing; // fecha de cierre
    const numMatches = JSON.parse(localStorage.getItem("generalInfo")).numMatches; // cantidad de partidos a crear
    const availableTeams = JSON.parse(localStorage.getItem("teams")); // equipos
    const randomMatches = [];

    console.log(startDate,"fecha de inicio")

    for (let i = 0; i < numMatches; i++) {
      // Seleccionar dos equipos aleatorios
      const homeTeamIndex = Math.floor(Math.random() * availableTeams.length);
      const homeTeam = availableTeams[homeTeamIndex];
      availableTeams.splice(homeTeamIndex, 1);

      const awayTeamIndex = Math.floor(Math.random() * availableTeams.length);
      const awayTeam = availableTeams[awayTeamIndex];
      availableTeams.splice(awayTeamIndex, 1);

      // Asignar una fecha entre la fecha de inicio y cierre
      const daysToAdd = Math.floor(i / 4) + 1;
      const matchDate = new Date(startDate);
      matchDate.setDate(matchDate.getDate() + daysToAdd);

      // Asignar un horario de 1900 o 2100
      const matchTime = i % 2 === 0 ? "19:00" : "21:00";

      // Crear el objeto de partido
      const newMatch = {
        date: format(matchDate, "MM/dd/yyyy"),
        time: matchTime,
        homeTeam,
        awayTeam,
      };
      
      randomMatches.push(newMatch);
    }

    // Agregar los partidos al estado y al local storage
    setMatches([...matches, ...randomMatches]);
    localStorage.setItem(
      "matches",
      JSON.stringify([...matches, ...randomMatches])
    );
  };

  return (
    <Box sx={{ width: "100%", minWidth: isMobile ? "400px" : "auto" }}>
      <p style={{ textAlign: "center" }}>
        {" "}
        First stage matches : {matches.length}
      </p>
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
          onClick={
            handleCreateRandomMatches
          }
          sx={{ width: "200px", marginBottom: "10px", marginLeft: "10px" }}
        >
          Create random matches
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
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((match, i) => (
              <TableRow key={i + 1}>
                <TableCell sx={{ textAlign: "center" }}>{i + 1}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{match.date}</TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    display: isMobile ? "none" : "static",
                  }}
                >
                  {match.time}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {isMobile ? match.homeTeam.shortName : match.homeTeam.name}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {isMobile ? match.awayTeam.shortName : match.awayTeam.name}
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
      <Dialog
        open={open || Boolean(editingMatch)}
        onClose={() => {
          setOpen(false);
          setEditingMatch(null);
        }}
      >
        <DialogTitle>Create Match</DialogTitle>
        <DialogContent>
          <AddMatchCard
            onAddMatch={handleAddMatch}
            teams={teams}
            editingMatch={editingMatch}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Matches;
