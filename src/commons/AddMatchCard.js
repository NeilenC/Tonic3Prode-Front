import { useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardMedia,
  TextField,
  Autocomplete,
  Box,
  Button,
} from "@mui/material";

const AddMatchCard = ({ onAddMatch, teams, stadiums }) => {
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState (null);
  const [stadium, setStadium] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMatch = {
      homeTeam: team1.nombre,
      awayTeam: team2.nombre,
      stadium: stadium.nombre,
      date,
      time,
    };
    onAddMatch(newMatch);
  };

  const handleTeam1Change = (event, value) => {
    setTeam1(value);
    teams.splice(
      teams.findIndex((team) => team.nombre === value.nombre),
      1
    );
  };

  const handleTeam2Change = (event, value) => {
    setTeam2(value);
    teams.splice(
      teams.findIndex((team) => team.nombre === value.nombre),
      1
    );
  };

  const handleStadium = (event, value) => {
    setStadium(value);
    stadiums.splice(
      stadiums.findIndex((stadium) => stadium.nombre === value.nombre),
      1
    );
  };

  return (
    <Card sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 120, minWidth: 120 }}
        image="https://via.placeholder.com/120x90?text=Imagen"
        alt="Imagen"
      />
      <CardContent sx={{ flex: "1 1 auto" }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
            <Autocomplete
              id="team1"
              options={teams}
              getOptionLabel={(option) => option.nombre}
              sx={{ mr: 2 }}
              renderInput={(params) => (
                <TextField {...params} label="Equipo 1" />
              )}
              onChange={handleTeam1Change}
              value={team1}
            />
            <Autocomplete
              id="team2"
              options={teams}
              getOptionLabel={(option) => option.nombre}
              renderInput={(params) => (
                <TextField {...params} label="Equipo 2" />
              )}
              onChange={handleTeam2Change}
              value={team2}
            />
          </Box>
          <Autocomplete
            id="stadium"
            options={stadiums}
            getOptionLabel={(option) => option.nombre}
            renderInput={(params) => <TextField {...params} label="stadium" />}
            onChange={handleStadium}
            value={stadium}
          />
          <TextField
            id="date"
            label="Fecha"
            variant="outlined"
            fullWidth
            margin="normal"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <TextField
            id="time"
            label="Hora"
            variant="outlined"
            fullWidth
            margin="normal"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Guardar cruce
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMatchCard;
