import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Autocomplete,
  Box,
  Button,
  InputLabel,
} from "@mui/material";
import InputMask from "react-input-mask";

const AddMatchCard = ({ onAddMatch, teams, stadiums, editingMatch }) => {
  const [homeTeam, setHomeTeam] = useState(editingMatch?.homeTeam ?? "");
  const [awayTeam, setAwayTeam] = useState(editingMatch?.awayTeam ?? "");
  const [stadium, setStadium] = useState(editingMatch?.stadium ?? "");
  const [date, setDate] = useState(editingMatch?.date ?? "");
  const [time, setTime] = useState(editingMatch?.time ?? "");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!homeTeam || !awayTeam || !stadium || !date || !time) {
      alert(
        "please complete all the fields of the form before submitting the match"
      );
      return;
    }
    const newMatch = {
      homeTeam: homeTeam,
      awayTeam: awayTeam,
      stadium: stadium,
      date,
      time,
    };
    onAddMatch(newMatch);
    setHomeTeam(null);
    setAwayTeam(null);
    setStadium(null);
    setDate("");
    setTime("");
  };

  const [initialValues, setInitialValues] = useState({
    homeTeam: null,
    awayTeam: null,
    stadium: null,
    date: "",
    time: "",
  });

  useEffect(() => {
    if (editingMatch) {
      setInitialValues({
        homeTeam: teams.find((team) => team._id === editingMatch.homeTeam._id),
        awayTeam: teams.find((team) => team._id === editingMatch.awayTeam._id),
        stadium: stadiums.find(
          (stadium) => stadium._id === editingMatch.stadium._id
        ),
        date: editingMatch.date,
        time: editingMatch.time,
      });
    }
  }, [editingMatch]);

  const handleHomeTeamChange = (event, value) => {
    if (awayTeam === value && awayTeam) {
      alert("you can't select the same team twice");
      return
    }
    setHomeTeam(value);
  };

  const handleAwayTeamChange = (event, value) => {
    if (homeTeam === value && homeTeam) {
      alert("you can't select the same team twice");
      return
    }
    setAwayTeam(value);
  };

  const handleStadiumChange = (event, value) => {
    setStadium(value);
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    const [month, day, year] = value.split("/");
    if (parseInt(month) > 12) {
      alert("invalid month, please enter numbers between 01 and 12");
      return;
    }
    if (parseInt(day) > 31) {
      alert("invalid day, please enter numbers between 01 and 31 day");
      return;
    }
    if (parseInt(year) < 2020 && year.length === 4) {
      alert("invalid year, please enter numbers greater than 2021");
      return
    }
    if (parseInt(value) <  JSON.parse(localStorage.getItem("generalInfo")).beginning) {
      alert("invalid year, please enter numbers greater than 2021");
      return
    }

    const beginningDate = new Date(JSON.parse(localStorage.getItem("generalInfo")).beginning);
    const finishingDate = new Date(JSON.parse(localStorage.getItem("generalInfo")).finishing);
    const inputDate = new Date(year, month - 1, day); // el mes arranca de 0 
 
    if (inputDate < beginningDate && year.length === 4) {
      alert("The date entered is before than the tournament beginning date. Please enter a valid date.");
      return;
    }
    if (finishingDate < inputDate && year.length === 4) {
      alert("The date entered is after than the tournament beginning date. Please enter a valid date.");
      return;
    }

    setDate(value);
  };

  const handleTimeChange = (event) => {
    const value = event.target.value;
    const [hours, minutes] = value.split(":");
    if (parseInt(hours) > 23) {
      alert("invalid hour, please enter numbers smaller than 23");
      return
    }
    if (parseInt(minutes) > 59) {
      alert("invalid minutes, please enter numbers smaller than 59");
      return
    }
    setTime(event.target.value);
  };

  return (
    <Card sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
      <CardContent>
        <form onSubmit={handleFormSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Autocomplete
              id="home-team"
              options={teams}
              getOptionLabel={(option, i) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Home Team" />
              )}
              onChange={handleHomeTeamChange}
              value={homeTeam || initialValues.homeTeam}
            />
            <Autocomplete
              id="away-team"
              options={teams}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Away Team" />
              )}
              onChange={handleAwayTeamChange}
              value={awayTeam || initialValues.awayTeam}
            />
            <Autocomplete
              id="stadium"
              options={stadiums}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Stadium" />
              )}
              onChange={handleStadiumChange}
              value={stadium || initialValues.stadium}
            />
            <InputLabel htmlFor="Date">date</InputLabel>
            <InputMask
              mask="99/99/9999"
              maskChar=""
              value={date || initialValues.date}
              onChange={handleDateChange}
            >
              {() => (
                <TextField
                  id="date"
                  type="text"
                  inputProps={{ maxLength: 10 }}
                  placeholder="11/31/2023"
                />
              )}
            </InputMask>
            <InputLabel htmlFor="time">Time</InputLabel>
            <InputMask
              mask="99:99"
              maskChar=""
              value={time || initialValues.time}
              onChange={handleTimeChange}
            >
              {() => (
                <TextField
                  id="time"
                  type="text"
                  inputProps={{ maxLength: 5 }}
                  placeholder="16:00"
                />
              )}
            </InputMask>
            <Button type="submit" variant="contained">
              Save Match
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMatchCard;
