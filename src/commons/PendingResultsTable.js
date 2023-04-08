import React, { useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";

const PendingResultsTable = ({ data }) => {
  const [editedData, setEditedData] = useState({});

  const handleDayOfMonthEdit = (gameId, value) => {
    setEditedData((prevEdited) => ({
      ...prevEdited,
      [gameId]: {
        ...prevEdited[gameId],
        dayOfTheMonth: value,
      },
    }));
  };

  const handleMonthEdit = (gameId, value) => {
    setEditedData((prevEdited) => ({
      ...prevEdited,
      [gameId]: {
        ...prevEdited[gameId],
        month: value,
      },
    }));
  };

  const handleHourEdit = (gameId, value) => {
    setEditedData((prevEdited) => ({
      ...prevEdited,
      [gameId]: {
        ...prevEdited[gameId],
        hour: value,
      },
    }));
  };

  const handleResultEdit = (gameId, field, value) => {
    setEditedData((prevEdited) => ({
      ...prevEdited,
      [gameId]: {
        ...prevEdited[gameId],
        result: {
          ...prevEdited[gameId]?.result,
          [field]: value,
        },
      },
    }));
  };

  const handleSave = (gameId) => {
    if (editedData[gameId]) {
      const newData = data.map((game) => {
        if (game._id === gameId) {
          const updatedGame = {
            ...game,
            result: {
              ...game.result,
              ...editedData[gameId]?.result,
            },
            hour: editedData[gameId]?.hour ?? game.hour,
          };
          if (editedData[gameId].dayOfTheMonth !== undefined) {
            updatedGame.dayOfTheMonth = editedData[gameId].dayOfTheMonth;
          }
          if (editedData[gameId].month !== undefined) {
            updatedGame.month = editedData[gameId].month;
          }
          return updatedGame;
        }
        return game;
      });
      localStorage.setItem("myTableData", JSON.stringify(newData));
    }
  };

  const handleSaveAllDates = () => {
    const myData = JSON.parse(localStorage.getItem("myTableData"));
    // Lógica para enviar myData al backend
    axios
      .post("/api/results", myData)
      .then((response) => {
        localStorage.removeItem("myTableData");
      })
      .catch((error) => {
        // Manejo de errores
      });
  };

  const getWinningTeam = (game) => {
    return "holis"
/*     if (game.result.WinningType === "penalties") {
      if (game.result.HomeTeamPenalties > game.result.AwayTeamPenalties) {
        return "HomeTeam";
      } else {
        return "AwayTeam";
      }
    } else {
      if (game.result.HomeTeamScore > game.result.AwayTeamScore) {
        return "HomeTeam";
      } else {
        return "AwayTeam";
      }
    } */
  };

  return (
    <Box>
    <Button onClick={handleSaveAllDates}>Save Dates</Button>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Stage</TableCell>
            <TableCell>Day</TableCell>
            <TableCell>Month</TableCell>
            <TableCell>
              Hour
            </TableCell>
            <TableCell>Winning Type</TableCell>
            <TableCell>Winning Team</TableCell>
            <TableCell>HomeTeam</TableCell>
            <TableCell>Score HomeTeam</TableCell>
            <TableCell>AwayTeam</TableCell>
            <TableCell>Score AwayTeam</TableCell>
            <TableCell>Penalties HomeTeam</TableCell>
            <TableCell>Penalties AwayTeam</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((game) => (
            <TableRow key={game.gameIndex}>
              <TableCell>{game.gameIndex}</TableCell>
              <TableCell>{game.status}</TableCell>
              <TableCell>{game.stage}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={
                    editedData[game._id]?.dayOfTheMonth ?? game.dayOfTheMonth
                  }
                  onChange={(e) =>
                    handleDayOfMonthEdit(game._id, e.target.value)
                  }
                  onBlur={() => handleSave(game._id)}
                />
              </TableCell>
              <TableCell>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="month-label">Month</InputLabel>
                  <Select
                    labelId="month-label"
                    id="month-select"
                    value={editedData[game._id]?.month ?? game.month}
                    onChange={(e) => handleMonthEdit(game._id, e.target.value)}
                    onBlur={() => handleSave(game._id)}
                  >
                    <MenuItem value={1}>January</MenuItem>
                    <MenuItem value={2}>February</MenuItem>
                    <MenuItem value={3}>March</MenuItem>
                    <MenuItem value={4}>April</MenuItem>
                    <MenuItem value={5}>May</MenuItem>
                    <MenuItem value={6}>June</MenuItem>
                    <MenuItem value={7}>July</MenuItem>
                    <MenuItem value={8}>August</MenuItem>
                    <MenuItem value={9}>September</MenuItem>
                    <MenuItem value={10}>October</MenuItem>
                    <MenuItem value={11}>November</MenuItem>
                    <MenuItem value={12}>December</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={editedData[game._id]?.hour ?? game.hour}
                  onChange={(e) => handleHourEdit(game._id, e.target.value)}
                  onBlur={() => handleSave(game._id)}
                />
              </TableCell>
              <TableCell>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="select-label">Winning by</InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    value={
                      editedData[game._id]?.result?.WinningType ??
                      game.result.WinningType
                    }
                    onChange={(e) =>
                      handleResultEdit(game._id, "WinningType", e.target.value)
                    }
                    onBlur={() => handleSave(game._id)}
                  >
                    <MenuItem value="regular">Regular</MenuItem>
                    <MenuItem value="penalties">Penalties</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>{getWinningTeam()}</TableCell>
              <TableCell>{game.teams[0].name}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={
                    editedData[game._id]?.result?.HomeTeamScore ??
                    game.result.HomeTeamScore
                  }
                  onChange={(e) =>
                    handleResultEdit(game._id, "HomeTeamScore", e.target.value)
                  }
                  onBlur={() => handleSave(game._id)}
                  disabled={
                    editedData[game._id]?.result?.WinningType !== "penalties" &&
                    editedData[game._id]?.result?.WinningType !== "regular"
                  }
                  sx={{backgroundColor: editedData[game._id]?.result?.WinningType !== "penalties" && editedData[game._id]?.result?.WinningType !== "regular" ? "lightgrey" : "white"}}
                />
              </TableCell>
              <TableCell>{game.teams[1].name}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={
                    editedData[game._id]?.result?.AwayTeamScore ??
                    game.result.AwayTeamScore
                  }
                  onChange={(e) =>
                    handleResultEdit(game._id, "AwayTeamScore", e.target.value)
                  }
                  onBlur={() => handleSave(game._id)}
                  disabled={
                    editedData[game._id]?.result?.WinningType !== "penalties" &&
                    editedData[game._id]?.result?.WinningType !== "regular"
                  }
                  sx={{backgroundColor: editedData[game._id]?.result?.WinningType !== "penalties" && editedData[game._id]?.result?.WinningType !== "regular" ? "lightgrey" : "white"}}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={
                    editedData[game._id]?.result?.HomeTeamPenalties ??
                    game.result.HomeTeamPenalties
                  }
                  onChange={(e) =>
                    handleResultEdit(
                      game._id,
                      "HomeTeamPenalties",
                      e.target.value
                    )
                  }
                  onBlur={() => handleSave(game._id)}
                  disabled={
                    editedData[game._id]?.result?.WinningType !== "penalties"
                  }
                  sx={{backgroundColor: editedData[game._id]?.result?.WinningType !== "penalties" ? "lightgrey" : "white"}}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={
                    editedData[game._id]?.result?.AwayTeamPenalties ??
                    game.result.AwayTeamPenalties
                  }
                  onChange={(e) =>
                    handleResultEdit(
                      game._id,
                      "AwayTeamPenalties",
                      e.target.value
                    )
                  }
                  onBlur={() => handleSave(game._id)}
                  disabled={
                    editedData[game._id]?.result?.WinningType !== "penalties"
                  }
                  sx={{backgroundColor: editedData[game._id]?.result?.WinningType !== "penalties" ? "lightgrey" : "white"}}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default PendingResultsTable;
