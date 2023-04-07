import React from "react";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import styles from "../styles/admin/ResultsBis.module.css";

const PendingResultsTable = ({ gamesAdmin }) => {
  const [games, setGames] = useState(gamesAdmin);
  const [editableCell, setEditableCell] = useState(null);
  const [editedGames, setEditedGames] = useState(new Set());
  const [newGames, setNewGames] = useState([]);

  const handleCellClick = (rowIndex, columnIndex) => {
    setEditableCell({ rowIndex, columnIndex });
  };

  const handleCellChange = (event, gameId, columnName, team) => {
    const { value } = event.target;
    setGames((prevGames) =>
      prevGames.map((game) =>
        game._id === gameId
          ? {
              ...game,
              result: [
                {
                  ...game.result[0],
                  [`${team}TeamScore`]: value,
                },
              ],
            }
          : game
      )
    );
    setEditedGames((prevGames) => prevGames.add(gameId));

    // Guardar el estado "games" en el Local Storage
    localStorage.setItem("games", JSON.stringify(games));
  };

  const handleSaveChanges = () => {
    // Save changes to the backend
    console.log("Saving changes to the backend...");

    // Clear the editedGames set and remove the "edited-cell" class from all cells
    setEditedGames(new Set());
    const editedCells = document.getElementsByClassName("edited-cell");
    for (let i = 0; i < editedCells.length; i++) {
      editedCells[i].classList.remove("edited-cell");
    }

    // Send new games to the backend
    console.log("Sending new games to the backend...", newGames);

    // Clear the newGames array
    setNewGames([]);
  };

  const calculateWinner = (
    team1,
    team2,
    team1Goals,
    team2Goals,
    team1Penalties,
    team2Penalties
  ) => {
    return "hola"
  }
  
  /* {
    const result = game.result ? game.result[0] : ""; // valor predeterminado es una cadena vacía
    let winningTeam;
    if (team1Goals > team2Goals) {
      winningTeam = "Equipo 1";
    } else if (team2Goals > team1Goals) {
      winningTeam = "Equipo 2";
    } else if (team1Penalties > team2Penalties) {
      winningTeam = "Equipo 1 (penales)";
    } else if (team2Penalties > team1Penalties) {
      winningTeam = "Equipo 2 (penales)";
    } else {
      winningTeam = "Pendiente";
    }
    return winningTeam;
  } */;

  const rows = [...games, ...newGames];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID Game</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Stage</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Hour</TableCell>
            <TableCell>Winning Team</TableCell>
            <TableCell>HomeTeam</TableCell>
            <TableCell>Score HomeTeam</TableCell>
            <TableCell>AwayTeam</TableCell>
            <TableCell>Score AwayTeam</TableCell>
            <TableCell>Winning</TableCell>
            <TableCell>Penalties HomeTeam</TableCell>
            <TableCell>Penalties AwayTeam</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((game) => (
            <TableRow key={game.gameIndex}>
              <TableCell>{game.gameIndex}</TableCell>
              <TableCell>{game.status}</TableCell>
              <TableCell>{game.stage}</TableCell>
              <TableCell>{`${game.dayOfTheMonth}/${game.month}`}</TableCell>
              <TableCell>{game.hour}</TableCell>
              <TableCell>tu vieja</TableCell>
              <TableCell>{`${game.teams[0].name} (${game.teams[0].shortName})`}</TableCell>
              <TableCell>
                {editableCell?.rowIndex === game._id &&
                editableCell?.columnIndex === 5 ? (
                  <TextField
                    size="small"
                    type="number"
                    defaultValue={game.result[0].homeTeamScore}
                    onChange={(event) =>
                      handleCellChange(event, game._id, "homeTeamScore", "home")
                    }
                  />
                ) : (
                  <span
                    onClick={() => handleCellClick(game._id, 5)}
                    style={{ cursor: "pointer" }}
                    className={`${styles.cell} ${
                      editedGames.has(game._id) ? styles.editedCell : ""
                    }`}
                  >
                    {game.result === [] ? null : 1}
                  </span>
                )}
              </TableCell>
              <TableCell>{`${game.teams[1].name} (${game.teams[1].shortName})`}</TableCell>
              <TableCell>
                {editableCell?.rowIndex === game._id &&
                editableCell?.columnIndex === 7 ? (
                  <TextField
                    size="small"
                    type="number"
                    defaultValue={game.result[0].awayTeamScore}
                    onChange={(event) =>
                      handleCellChange(event, game._id, "awayTeamScore", "away")
                    }
                  />
                ) : (
                  <span
                    onClick={() => handleCellClick(game._id, 7)}
                    style={{ cursor: "pointer" }}
                    className={`${styles.cell} ${
                      editedGames.has(game._id) ? styles.editedCell : ""
                    }`}
                  >
                    {game.result === [] ? null : 1}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="select-label">Winning by</InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    value={game.winning}
                    onChange={handleCellChange}
                  >
                    <MenuItem value="regular">Regular</MenuItem>
                    <MenuItem value="penalties">Penalties</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                {editableCell?.rowIndex === game._id &&
                editableCell?.columnIndex === 11 ? (
                  <TextField
                    size="small"
                    type="number"
                    defaultValue={game.result[0].homeTeamPenalties}
                    onChange={(event) =>
                      handleCellChange(
                        event,
                        game._id,
                        "homeTeamPenalties",
                        "home"
                      )
                    }
                  />
                ) : (
                  <span
                    onClick={() => handleCellClick(game._id, 11)}
                    style={{ cursor: "pointer" }}
                    className={`${styles.cell} ${
                      editedGames.has(game._id) ? styles.editedCell : ""
                    }`}
                  >
                     {game.result === [] ? null : 1}
                  </span>
                )}
              </TableCell>
              <TableCell>
                {editableCell?.rowIndex === game._id &&
                editableCell?.columnIndex === 12 ? (
                  <TextField
                    size="small"
                    type="number"
                    defaultValue={game.result[0].awayTeamPenalties}
                    onChange={(event) =>
                      handleCellChange(
                        event,
                        game._id,
                        "awayTeamPenalties",
                        "away"
                      )
                    }
                  />
                ) : (
                  <span
                    onClick={() => handleCellClick(game._id, 12)}
                    style={{ cursor: "pointer" }}
                    className={`${styles.cell} ${
                      editedGames.has(game._id) ? styles.editedCell : ""
                    }`}
                  >
                    {game.result === [] ? null : 1}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        onClick={handleSaveChanges}
        sx={{ marginTop: "10px", marginLeft: "10px" }}
      >
        Save changes
      </Button>
    </TableContainer>
  );
};
export default PendingResultsTable;
