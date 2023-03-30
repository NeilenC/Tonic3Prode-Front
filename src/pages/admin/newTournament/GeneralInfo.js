import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import styles from "../../../styles/admin/newTournament/generalInfo.module.css";
import { useMediaQuery } from "@mui/material";
//import { FormattedMessage } from "react-intl";

const GeneralInfo = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("active");
  const [type, setType] = useState("winner-remains-on-court");
  const [members, setMembers] = useState("teams");
  const [numMatches, setNumMatches] = useState(32);
  const [beginning, setBeginning] = useState("");
  const [finishing, setFinishing] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const generalInfo = JSON.parse(localStorage.getItem("generalInfo"));
    if (generalInfo) {
      setTitle(generalInfo.title);
      setStatus(generalInfo.status);
      setType(generalInfo.type);
      setMembers(generalInfo.members);
      setBeginning(generalInfo.beginning);
      setFinishing(generalInfo.finishing);
      setImageUrl(generalInfo.imageUrl);
    }
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    localStorage.setItem(
      "generalInfo",
      JSON.stringify({ ...getGeneralInfo(), title: event.target.value })
    );
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    localStorage.setItem(
      "generalInfo",
      JSON.stringify({ ...getGeneralInfo(), status: event.target.value })
    );
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
    localStorage.setItem(
      "generalInfo",
      JSON.stringify({ ...getGeneralInfo(), imageUrl: event.target.value })
    );
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
    localStorage.setItem(
      "generalInfo",
      JSON.stringify({ ...getGeneralInfo(), type: event.target.value })
    );
  };

  const handleMembersChange = (event) => {
    setMembers(event.target.value);
    localStorage.setItem(
      "generalInfo",
      JSON.stringify({ ...getGeneralInfo(), members: event.target.value })
    );
  };

  const handleBeginningChange = (event) => {
    if (event.target.value === "") return;
    const [year, month, day] = event.target.value.split("-");
    let newDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    setBeginning(newDate);
    localStorage.setItem(
      "generalInfo",
      JSON.stringify({ ...getGeneralInfo(), beginning: newDate })
    );
  };

  const handleFinishingChange = (event) => {
    if (event.target.value === "") return;
    const [year, month, day] = event.target.value.split("-");
    let newDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    if (newDate < beginning) {
      alert("La fecha de finalización no puede ser menor a la de inicio");
      return;
    }
    setFinishing(newDate);
    localStorage.setItem(
      "generalInfo",
      JSON.stringify({ ...getGeneralInfo(), finishing: newDate })
    );
  };

  const getGeneralInfo = () => {
    return {
      title,
      status,
      type,
      members,
      numMatches,
      beginning,
      finishing,
    };
  };

  return (
    <form
      suppressHydrationWarning={true}
      className={styles.form}
      style={{ width: "100%", minWidth: isMobile ? "auto" : "auto" }}
    >
      <TextField
        label="Title"
        value={title}
        onChange={handleTitleChange}
        fullWidth
        className={styles.input}
        required
      />
      <FormControl fullWidth>
        <InputLabel id="status-select-label">Estado</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          value={status}
          label="Status"
          onChange={handleStatusChange}
          className={styles.input}
        >
          <MenuItem value="active">Activo</MenuItem>
          <MenuItem value="finish">Finalizado</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="type-select-label">Tipo</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={type}
          label="Type"
          onChange={handleTypeChange}
          className={styles.input}
        >
          <MenuItem value="winner remains on court">Ganador</MenuItem>
          <MenuItem value="points tournament">Puntos</MenuItem>
          <MenuItem value="points tournament with group face">
            Puntos en la fase de grupos
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="members-select-label">Miembros</InputLabel>
        <Select
          labelId="members-select-label"
          id="members-select"
          value={members}
          label="Members"
          onChange={handleMembersChange}
          className={styles.input}
        >
          <MenuItem value="teams">Equipos</MenuItem>
          <MenuItem value="countrys">Países</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Beginning"
        type="date"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        value={beginning}
        onChange={handleBeginningChange}
        className={styles.input}
      />
      <TextField
        label="Finishing"
        type="date"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        value={finishing}
        onChange={handleFinishingChange}
        className={styles.input}
        disabled={beginning === "" ? "true" : ""}
      />
      <TextField
        label="Image URL"
        value={imageUrl}
        onChange={handleImageUrlChange}
        fullWidth
        className={styles.input}
        required
      />
    </form>
  );
};

export default GeneralInfo;
