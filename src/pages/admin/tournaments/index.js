import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableSortLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import customAxios from "../../../../utils/customAxios";
import axios from "axios";
import { useEffect, useState } from "react";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedTournamentUrl, setSelectedTournamentUrl] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  useEffect(() => {
    async function searchTournaments() {
      const response = await customAxios.get(
        "http://localhost:3001/api/tournaments/all"
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

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function handleRequestSort(event, property) {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  }

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
      <TableContainer sx={{ display: "flex", width: "auto", align: "center" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sortDirection={orderBy === "title" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "title"}
                  direction={orderBy === "title" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "title")}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                sortDirection={orderBy === "stage" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "stage"}
                  direction={orderBy === "stage" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "stage")}
                >
                  Stage
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                sortDirection={orderBy === "type" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "type"}
                  direction={orderBy === "type" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "type")}
                >
                  Type
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                sortDirection={orderBy === "teams" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "teams"}
                  direction={orderBy === "teams" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "teams")}
                >
                  Teams
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                sortDirection={orderBy === "games" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "games"}
                  direction={orderBy === "games" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "games")}
                >
                  Games
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                sortDirection={orderBy === "beginning" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "beginning"}
                  direction={orderBy === "beginning" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "beginning")}
                >
                  Beginning
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                sortDirection={orderBy === "ending" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "ending"}
                  direction={orderBy === "ending" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "ending")}
                >
                  Ending
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(tournaments, getComparator(order, orderBy)).map(
              (tournament) => (
                <>
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
                    onClick={() =>
                      (window.location.href = `http://localhost:3000/admin/tournaments/${tournament._id}`)
                    }
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
                    <TableCell align="center">{tournament.stage}</TableCell>
                    <TableCell align="center">{tournament.type}</TableCell>
                    <TableCell align="center">
                      {tournament.teams.length}
                    </TableCell>
                    <TableCell align="center">
                      {tournament.games.length}
                    </TableCell>
                    <TableCell align="center">
                      {formatDate(tournament.beginning)}
                    </TableCell>
                    <TableCell align="center">
                      {formatDate(tournament.ending)}
                    </TableCell>
                  </TableRow>
                </>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default Tournaments;
