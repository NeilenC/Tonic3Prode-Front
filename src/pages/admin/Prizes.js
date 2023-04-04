import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import { EmojiEvents as PrizesIcon } from "@mui/icons-material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";

const Prizes = () => {
  const [filteredPrizes, setFilteredPrizes] = useState([]);
  const [country, setCountry] = useState("Argentina");
  const [tournament, setTournament] = useState([]);
  const [tournamentID, setTournamentID] = useState("");
  const [selectedTournament, setSelectedTournament] = useState("");
  const [tournamentTitles, setTournamentTitles] = useState([]);

  const currency = ["AR$ ", "BRZ ", "U$D "];

  const onTournamentChange = (event) => {
    setSelectedTournament(event.target.value);
    handleTournamentChange(event);
  };

  const handleCountry = (country) => {
    setCountry(country);
  };

  const handleTournamentChange = (event) => {
    axios
      .get("http://localhost:3001/api/tournaments")
      .then((res) => {
        const filteredTournament = res.data.find(
          (tournament) => tournament.title === event.target.value
        );
        if (filteredTournament) {
          setTournamentID(filteredTournament._id);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setSelectedTournament(event.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/api/tournaments").then((res) => {
      const tournaments = res.data.map((tournament) => tournament.title);
      setTournamentTitles(tournaments);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/api/tournaments").then((res) => {
      console.log(res.data, "info tournaments");
      const tournaments = res.data.map((tournament) => tournament.title);
      console.log(tournaments, "tournaments");
      setTournament(tournaments);
    });
  }, []);

  useEffect(() => {
    console.log(tournamentID, "tournamentID");
    axios
      .get("http://localhost:3001/api/prizes")
      .then((res) => {
        const filteredPrizes = res.data.filter(
          (prize) => prize.tournament === tournamentID
        );
        console.log(filteredPrizes, "filteredPrizes");
        setFilteredPrizes(filteredPrizes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tournamentID]);

  return (
    <Box>
      <>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ margin: "20px" }}
              onClick={() => {
                window.location.href = "http://localhost:3000/admin/newPrize";
              }}
            >
              Add new Prize
            </Button>
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <Select
                labelId="tournament-select-label"
                id="tournament-select"
                value={tournamentTitles || tournament}
                onChange={onTournamentChange}
                variant="outlined"
                size="small"
                style={{ width: 300 }}
              >
                {Array.isArray(tournament) && tournament.length > 0 ? (
                  tournament.map((t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No tournaments found</MenuItem>
                )}
              </Select>
              {selectedTournament && (
                <div style={{ marginTop: 10 }}>
                  Selected tournament: {selectedTournament}
                </div>
              )}
            </div>
          </>
        </Box>
      </>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
          alignItems: "center",
          marginTop: "20px",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Button
          variant={country === "Argentina" ? "contained" : "outlined"}
          color="primary"
          sx={{
            marginRight: { xs: "0", md: "10px" },
            width: { xs: "100%", md: "auto" },
            marginBottom: { xs: "10px", md: "0" },
          }}
          startIcon={<PrizesIcon />}
          onClick={() => handleCountry("Argentina")}
        >
          Argentina
        </Button>
        <Button
          variant={country === "Brazil" ? "contained" : "outlined"}
          color="primary"
          sx={{
            marginRight: { xs: "0", md: "10px" },
            width: { xs: "100%", md: "auto" },
            marginBottom: { xs: "10px", md: "0" },
          }}
          startIcon={<PrizesIcon />}
          onClick={() => handleCountry("Brazil")}
        >
          Brazil
        </Button>
        <Button
          variant={country === "USA" ? "contained" : "outlined"}
          color="primary"
          sx={{
            marginRight: { xs: "0", md: "10px" },
            width: { xs: "100%", md: "auto" },
            marginBottom: { xs: "10px", md: "0" },
          }}
          startIcon={<PrizesIcon />}
          onClick={() => handleCountry("USA")}
        >
          United States
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
          alignItems: "center",
          marginTop: "20px",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {filteredPrizes.length > 0 && (
          <Box sx={{ marginX: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: 300,
              }}
            >
              <Typography color="primary" variant="h2" align="center">
                <PrizesIcon style={{ fontSize: "65px" }} />
              </Typography>

              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  padding: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  variant="h6"
                  align="center"
                  style={{ color: "lightseagreen" }}
                >
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ color: "blue", opacity: 0.8 }}
                  >
                    {" "}
                    FIRST PRIZE{" "}
                  </Typography>

                  {country === "Argentina"
                    ? currency[0]
                      ? currency[0]
                      : ""
                    : ""}
                  {country === "Brazil" ? (currency[1] ? currency[1] : "") : ""}
                  {country === "USA" ? (currency[2] ? currency[2] : "") : ""}
                  {filteredPrizes[0].firstPrize[country]}
                </Typography>
              </Box>

              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  marginTop: 10,
                  padding: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  variant="h6"
                  align="center"
                  style={{ color: "lightseagreen" }}
                >
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ color: "blue", opacity: 0.8 }}
                  >
                    {" "}
                    SECOND PRIZE{" "}
                  </Typography>
                  {country === "Argentina"
                    ? currency[0]
                      ? currency[0]
                      : ""
                    : ""}
                  {country === "Brazil" ? (currency[1] ? currency[1] : "") : ""}
                  {country === "USA" ? (currency[2] ? currency[2] : "") : ""}
                  {filteredPrizes[0].secondPrize[country]}
                </Typography>
              </Box>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  marginTop: 10,
                  padding: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  variant="h6"
                  align="center"
                  style={{ color: "lightseagreen" }}
                >
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ color: "blue", opacity: 0.8 }}
                  >
                    {" "}
                    THIRD PRIZE{" "}
                  </Typography>
                  {country === "Argentina"
                    ? currency[0]
                      ? currency[0]
                      : ""
                    : ""}
                  {country === "Brazil" ? (currency[1] ? currency[1] : "") : ""}
                  {country === "USA" ? (currency[2] ? currency[2] : "") : ""}
                  {filteredPrizes[0].thirdPrize[country]}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Prizes;
