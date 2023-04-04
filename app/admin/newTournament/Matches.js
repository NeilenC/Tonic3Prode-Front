'use client';

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
import availableStadiums from "@/fakeData/stadiums";
import { Box, width } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import axios from "axios";

const Matches = () => {
  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState(
    JSON.parse(localStorage.getItem("teams")) || []
  );
  const [stadiums, setStadiums] = useState(availableStadiums);
  const [matches, setMatches] = useState(
    JSON.parse(localStorage.getItem("matches")) || []
  );
  const isMobile = useMediaQuery("(max-width:600px)");
  const [editingMatch, setEditingMatch] = useState(null);

  useEffect(() => {
    async function getStadiums() {
      const response = await axios.get("http://localhost:3001/api/stadiums");
      setStadiums(response.data);
    }
    getStadiums();
  }, []);

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
                  {match.date}
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
                  {match.stadium.name}
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
            stadiums={stadiums}
            editingMatch={editingMatch}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Matches;
