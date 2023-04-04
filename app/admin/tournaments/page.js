'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedTournamentUrl, setSelectedTournamentUrl] = useState(null);

  useEffect(() => {
    async function searchTournaments() {
      const response = await axios.get(
        "http://localhost:3001/api/tournaments/"
      );
      return response.data;
    }
    searchTournaments().then((data) => setTournaments(data));
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ margin: "20px" }}
        onClick={() => {
          window.location.href = "http://localhost:3000/admin/newTournament";
        }}
      >
        Add new tournament
      </Button>
      <TableContainer sx={{ display:"flex", width:"auto", align:"center" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Beginning</TableCell>
              <TableCell align="right">Ending</TableCell>
              <TableCell align="right">Stage</TableCell>
              <TableCell align="right">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tournaments.map((tournament) => (
              <TableRow
                key={tournament._id}
                onMouseEnter={() => {
                  setSelectedRow(tournament._id);
                  setSelectedTournamentUrl(
                    `http://localhost:3000/admin/tournaments/${tournament._id}`
                  );
                }}
                onMouseLeave={() => {
                  setSelectedRow(null);
                  setSelectedTournamentUrl(null);
                }}
                onClick={() => window.location.assign(selectedTournamentUrl)}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor:
                    selectedRow === tournament._id ? "#e0e0e0" : "",
                  cursor: "pointer",
                }}
              >
                <TableCell component="th" scope="row">
                  {tournament.title}
                </TableCell>
                <TableCell align="right">
                  {formatDate(tournament.beginning)}
                </TableCell>
                <TableCell align="right">
                  {formatDate(tournament.ending)}
                </TableCell>
                <TableCell align="right">{tournament.stage}</TableCell>
                <TableCell align="right">{tournament.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Tournaments;
