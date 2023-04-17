import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import styles from "../../../styles/admin/newTournament/generalInfo.module.css";
import {
  Typography,
  useMediaQuery,
  Button,
  Container,
  Box,
} from "@mui/material";
import axios from "axios";
import customAxios from "../../../../utils/customAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrizeInfo = () => {
  // States
  const [tournament, setTournament] = useState(null);
  const [tournamentID, setTournamentID] = useState("");
  const [firstPrize, setFirstPrize] = useState({
    Argentina: "",
    Brazil: "",
    USA: "",
  });
  const [secondPrize, setSecondPrize] = useState({
    Argentina: "",
    Brazil: "",
    USA: "",
  });
  const [thirdPrize, setThirdPrize] = useState({
    Argentina: "",
    Brazil: "",
    USA: "",
  });
  const isMobile = useMediaQuery("(max-width:600px)");
  const [selectedTournament, setSelectedTournament] = useState(null);

  // Functions

  const getprizeInfo = () => {
    return {
      tournament: tournamentID,
      firstPrize: { ...firstPrize },
      secondPrize: { ...secondPrize },
      thirdPrize: { ...thirdPrize },
    };
  };

  // useEffects and axios calls

  useEffect(() => {
    const prizeInfo = JSON.parse(localStorage.getItem("prizeInfo"));
    if (prizeInfo) {
      setTournament(prizeInfo.tournament);
      setFirstPrize(prizeInfo.firstPrize);
      setSecondPrize(prizeInfo.secondPrize);
      setThirdPrize(prizeInfo.thirdPrize);
    }

    customAxios.get("http://localhost:3001/api/tournaments/all").then((res) => {
      console.log(res.data, "info tournaments");
      const tournaments = res.data.map((tournament) => tournament.title);
      console.log(tournaments, "tournaments");
      setTournament(tournaments);
    });
  }, []);

  // Handlers

  const onTournamentChange = (event) => {
    setSelectedTournament(event.target.value);
    handleTournamentChange(event);
  };

  const handleTournamentChange = (event) => {
    customAxios
      .get("http://localhost:3001/api/tournaments/all")
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

    localStorage.setItem(
      "prizeInfo",
      JSON.stringify({ ...getprizeInfo(), tournament: tournamentID })
    );
  };

  const handleFirstPrizeArgentinaChange = (event) => {
    setFirstPrize({ ...firstPrize, Argentina: event.target.value });
    localStorage.setItem(
      "prizeInfo",
      JSON.stringify({
        ...getprizeInfo(),
        firstPrize: { ...firstPrize, Argentina: event.target.value },
      })
    );
  };

  const handleFirstPrizeBrazilChange = (event) => {
    setFirstPrize({ ...firstPrize, Brazil: event.target.value });
    localStorage.setItem(
      "prizeInfo",
      JSON.stringify({
        ...getprizeInfo(),
        firstPrize: { ...firstPrize, Brazil: event.target.value },
      })
    );
  };

  const handleFirstPrizeUSAChange = (event) => {
    setFirstPrize({ ...firstPrize, USA: event.target.value });
    localStorage.setItem(
      "prizeInfo",
      JSON.stringify({
        ...getprizeInfo(),
        firstPrize: { ...firstPrize, USA: event.target.value },
      })
    );
  };

  const handleSecondPrizeArgentinaChange = (event) => {
    setSecondPrize({
      ...secondPrize,
      Argentina: event.target.value,
    });
    localStorage.setItem(
      "prizeInfo",
      JSON.stringify({
        ...getprizeInfo(),
        secondPrize: { ...secondPrize, Argentina: event.target.value },
      })
    );
  };

  const handleSecondPrizeBrazilChange = (event) => {
    setSecondPrize({
      ...secondPrize,
      Brazil: event.target.value,
    });
    localStorage.setItem(
      "prizeInfo",
      JSON.stringify({
        ...getprizeInfo(),
        secondPrize: { ...secondPrize, Brazil: event.target.value },
      })
    );
  };

  const handleSecondPrizeUSAChange = (event) => {
    setSecondPrize({
      ...secondPrize,
      USA: event.target.value,
    });
    localStorage.setItem(
      "prizeInfo",
      JSON.stringify({
        ...getprizeInfo(),
        secondPrize: { ...secondPrize, USA: event.target.value },
      })
    );
  };

  const handleThirdPrizeArgentinaChange = (event) => {
    setThirdPrize({
      ...thirdPrize,
      Argentina: event.target.value,
    });
    localStorage.setItem(
      "prizeInfo",
      JSON.stringify({
        ...getprizeInfo(),
        thirdPrize: { ...thirdPrize, Argentina: event.target.value },
      })
    );
  };

  const handleThirdPrizeBrazilChange = (event) => {
    setThirdPrize({
      ...thirdPrize,
      Brazil: event.target.value,
    });
    localStorage.setItem(
      "prizeInfo",
      JSON.stringify({
        ...getprizeInfo(),
        thirdPrize: { ...thirdPrize, Brazil: event.target.value },
      })
    );
  };

  const handleThirdPrizeUSAChange = (event) => {
    setThirdPrize({
      ...thirdPrize,
      USA: event.target.value,
    });
    localStorage.setItem(
      "prizeInfo",
      JSON.stringify({
        ...getprizeInfo(),
        thirdPrize: { ...thirdPrize, USA: event.target.value },
      })
    );
  };

  const handleSubmit = (event) => {
    const uid = localStorage.getItem("uid");
    event.preventDefault();
    const prizeInfo = JSON.parse(localStorage.getItem("prizeInfo"));
    localStorage.removeItem("prizeInfo");

    axios
      .post(`http://localhost:3001/api/prizes/admin/${uid}/addprize`, prizeInfo)
      .then((res) => {
        console.log(res.data);
        toast.success("Prize created successfully");
        window.location.href = "http://localhost:3000/admin";
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error creating prize");
      });     
  };

  return (
     <>
    <ToastContainer />
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form
          className={styles.form}
          style={{ width: "100%", minWidth: isMobile ? "360px" : "auto" }}
        >
          <>
            <div className={styles.prizeContainer}>
              <Typography
                color="primary"
                variant="h5"
                align="center"
                style={{
                margin: "20px",
                }}
              >
                CREATE PRIZE
              </Typography>

              <Typography
                variant="h6"
                align="center"
                style={{ color: "lightseagreen" }}
              >
                CHOOSE A TOURNAMENT
              </Typography>
              <div style={{ textAlign: "center", margin: "20px 0" }}>
                <Select
                  labelId="tournament-select-label"
                  id="tournament-select"
                  value={selectedTournament || tournament}
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
              <Typography
                variant="h6"
                align="center"
                style={{ color: "lightseagreen" }}
              >
                FIRST PRIZE
              </Typography>
              <div className={styles.countries} style={{ textAlign: "center" }}>
                <FormControl variant="outlined" size="small">
                  <TextField
                    label="Argentina: set prize in ARS"
                    value={firstPrize.Argentina}
                    onChange={handleFirstPrizeArgentinaChange}
                    fullWidth
                    className={styles.input}
                    required
                  />
                </FormControl>
                <FormControl variant="outlined" size="small">
                  <TextField
                    label="Brazil: set prize in R$"
                    value={firstPrize.Brazil}
                    onChange={handleFirstPrizeBrazilChange}
                    fullWidth
                    className={styles.input}
                    required
                  />
                </FormControl>
                <FormControl variant="outlined" size="small">
                  <TextField
                    label="USA: set prize in USD"
                    value={firstPrize.USA}
                    onChange={handleFirstPrizeUSAChange}
                    fullWidth
                    className={styles.input}
                    required
                  />
                </FormControl>
              </div>
              <Typography
                variant="h6"
                align="center"
                style={{ color: "lightseagreen" }}
              >
                SECOND PRIZE
              </Typography>
              <div className={styles.countries} style={{ textAlign: "center" }}>
                <FormControl variant="outlined" size="small">
                  <TextField
                    label="Argentina: set prize in ARS"
                    value={secondPrize.Argentina}
                    onChange={handleSecondPrizeArgentinaChange}
                    fullWidth
                    className={styles.input}
                    required
                  />
                </FormControl>
                <FormControl variant="outlined" size="small">
                  <TextField
                    label="Brazil: set prize in R$"
                    value={secondPrize.Brazil}
                    onChange={handleSecondPrizeBrazilChange}
                    fullWidth
                    className={styles.input}
                    required
                  />
                </FormControl>
                <FormControl variant="outlined" size="small">
                  <TextField
                    label="USA: set prize in USD"
                    value={secondPrize.USA}
                    onChange={handleSecondPrizeUSAChange}
                    fullWidth
                    className={styles.input}
                    required
                  />
                </FormControl>
              </div>
              <Typography
                variant="h6"
                align="center"
                style={{ color: "lightseagreen" }}
              >
                THIRD PRIZE
              </Typography>
              <div className={styles.countries} style={{ textAlign: "center" }}>
                <FormControl variant="outlined" size="small">
                  <TextField
                    label="Argentina: set prize in ARS"
                    value={thirdPrize.Argentina}
                    onChange={handleThirdPrizeArgentinaChange}
                    fullWidth
                    className={styles.input}
                    required
                  />
                </FormControl>
                <FormControl variant="outlined" size="small">
                  <TextField
                    label="Brazil: set prize in R$"
                    value={thirdPrize.Brazil}
                    onChange={handleThirdPrizeBrazilChange}
                    fullWidth
                    className={styles.input}
                    required
                  />
                </FormControl>
                <FormControl variant="outlined" size="small">
                  <TextField
                    label="USA: set prize in USD"
                    value={thirdPrize.USA}
                    onChange={handleThirdPrizeUSAChange}
                    fullWidth
                    className={styles.input}
                    required
                  />
                </FormControl>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{
                  display: "block",
                  margin: "0 auto",
                  width: "100%",
                  maxWidth: "400px",
                }}
              >
                SUBMIT PRIZE INFO
              </Button>
            </div>
          </>
        </form>
      </Box>
    </Container>
  </>
  );
};

export default PrizeInfo;
