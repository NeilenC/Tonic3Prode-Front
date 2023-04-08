import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import styles from "../styles/admin/ResultsBis.module.css";

const PendingResultsTable = ({ gamesAdmin }) => {
  const [games, setGames] = useState(gamesAdmin);
  const [editableCell, setEditableCell] = useState(null);
  const [editedGames, setEditedGames] = useState(new Set());
  const [newGames, setNewGames] = useState([]);

  const handleCellClick = (gameId, columnIndex) => {
    setEditableCell({ gameId, columnIndex });
  };

 const handleCellChange = (event, gameId, fieldName) => {
   const { value } = event.target;

   const newGamesArray = games.map((game) => {
     if (game._id === gameId) {
       return {
         ...game,
         result: {
           ...game.result,
           [fieldName]: value,
         },
       };
     }
     return game;
   });

   setGames(newGamesArray);
   setEditedGames((prevSet) => prevSet.add(gameId));

   // Guardar el estado del juego modificado en el Local Storage cuando se hace clic en Enter o fuera de la celda
   const isEnterKey = event.key === "Enter";
   const isBlurEvent = event.type === "blur";
   if (isEnterKey || isBlurEvent) {
     localStorage.setItem(
       `game_${gameId}`,
       JSON.stringify(newGamesArray.find((game) => game._id === gameId))
     );
   }
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
    return "hola";
  };

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
              <TableCell>{"Pending"}</TableCell>
              <TableCell>{`${game.teams[0].name} (${game.teams[0].shortName})`}</TableCell>
              <TableCell>
                {editableCell?.rowIndex === game._id &&
                editableCell?.columnIndex === 8 ? (
                  <TextField
                    size="small"
                    type="number"
                    defaultValue={game.result.homeTeamScore}
                    onChange={(event) =>
                      handleCellChange(event, game._id, "homeTeamScore", "home")
                    }
                    onBlur={(event) =>
                      handleCellChange(event, game._id, "homeTeamScore", "home")
                    }
                    onKeyDown={(event) =>
                      event.key === "Enter" &&
                      handleCellChange(event, game._id, "homeTeamScore", "home")
                    }
                  />
                ) : (
                  <span
                    onClick={() => handleCellClick(game._id, 8)}
                    style={{ cursor: "pointer" }}
                    className={`${styles.cell} ${
                      editedGames.has(game._id) ? styles.editedCell : ""
                    }`}
                  >
                    {game.result.homeTeamScore}
                  </span>
                )}
              </TableCell>
              <TableCell>{`${game.teams[1].name} (${game.teams[1].shortName})`}</TableCell>
              <TableCell>
                {editableCell?.rowIndex === game._id &&
                editableCell?.columnIndex === 9 ? (
                  <TextField
                    size="small"
                    type="number"
                    defaultValue={game.result.awayTeamScore}
                    onChange={(event) =>
                      handleCellChange(event, game._id, "awayTeamScore", "away")
                    }
                    onBlur={(event) =>
                      handleCellChange(event, game._id, "awayTeamScore", "away")
                    }
                    onKeyDown={(event) =>
                      event.key === "Enter" &&
                      handleCellChange(event, game._id, "awayTeamScore", "away")
                    }
                  />
                ) : (
                  <span
                    onClick={() => handleCellClick(game._id, 9)}
                    style={{ cursor: "pointer" }}
                    className={`${styles.cell} ${
                      editedGames.has(game._id) ? styles.editedCell : ""
                    }`}
                  >
                    {game.result.awayTeamScore}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="select-label">Winning by</InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    value={game.winning ? game.winning : "regular"}
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
                    defaultValue={game.result.homeTeamPenalties}
                    onChange={(event) =>
                      handleCellChange(
                        event,
                        game._id,
                        "homeTeamPenalties",
                        "home"
                      )
                    }
                    onBlur={(event) =>
                      handleCellChange(
                        event,
                        game._id,
                        "homeTeamPenalties",
                        "home"
                      )
                    }
                    onKeyDown={(event) =>
                      event.key === "Enter" &&
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
                    {game.result.homeTeamPenalties}
                  </span>
                )}
              </TableCell>
              <TableCell>
                {editableCell?.rowIndex === game._id &&
                editableCell?.columnIndex === 12 ? (
                  <TextField
                    size="small"
                    type="number"
                    defaultValue={game.result.awayTeamPenalties}
                    onChange={(event) =>
                      handleCellChange(
                        event,
                        game._id,
                        "awayTeamPenalties",
                        "away"
                      )
                    }
                    onBlur={(event) =>
                      handleCellChange(
                        event,
                        game._id,
                        "awayTeamPenalties",
                        "away"
                      )
                    }
                    onKeyDown={(event) =>
                      event.key === "Enter" &&
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
                    {game.result.awayTeamPenalties}
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
