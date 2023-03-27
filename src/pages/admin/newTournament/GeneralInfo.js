import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import styles from "../../../styles/admin/newTournament/generalInfo.module.css";
import { useMediaQuery } from "@mui/material";

const GeneralInfo = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");
  const [type, setType] = useState("winner-remains-on-court");
  const [members, setMembers] = useState("teams");
  const [numMatches, setNumMatches] = useState(32);
  const [beginning, setBeginning] = useState("");
  const [finishing, setFinishing] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const generalInfo = JSON.parse(localStorage.getItem("generalInfo"));
    if (generalInfo) {
      setName(generalInfo.name);
      setStatus(generalInfo.status);
      setType(generalInfo.type);
      setMembers(generalInfo.members);
      setNumMatches(generalInfo.numMatches);
      setBeginning(generalInfo.beginning);
      setFinishing(generalInfo.finishing);
    }
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
    localStorage.setItem(
      "generalInfo",
      JSON.stringify({ ...getGeneralInfo(), name: event.target.value })
    );
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    localStorage.setItem(
      "generalInfo",
      JSON.stringify({ ...getGeneralInfo(), status: event.target.value })
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

  const handleNumMatchesChange = (event) => {
    setNumMatches(event.target.value);
    localStorage.setItem(
      "generalInfo",
      JSON.stringify({ ...getGeneralInfo(), numMatches: event.target.value })
    );
  };

  const handleBeginningChange = (event) => {
    const [year, month, day] = event.target.value.split("-");
    let newDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    setBeginning(newDate);
    localStorage.setItem(
      "generalInfo",
      JSON.stringify({ ...getGeneralInfo(), beginning: newDate })
    );
  };

  const handleFinishingChange = (event) => {
    const [year, month, day] = event.target.value.split("-");
    let newDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    setFinishing(newDate);
    localStorage.setItem(
      "generalInfo",
      JSON.stringify({ ...getGeneralInfo(), finishing: newDate })
    );
  };

  const getGeneralInfo = () => {
    return {
      name,
      status,
      type,
      members,
      numMatches,
      beginning,
      finishing,
    };
  };

  return (
    <form className={styles.form} style={{width: "100%", minWidth: isMobile ? "400px" : "1000px"}}>
      <TextField
        label="Name"
        value={name}
        onChange={handleNameChange}
        fullWidth
        className={styles.input}
        required
      />
      <FormControl fullWidth>
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          value={status}
          label="Status"
          onChange={handleStatusChange}
          className={styles.input}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="finish">Finish</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="type-select-label">Type</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={type}
          label="Type"
          onChange={handleTypeChange}
          className={styles.input}
        >
          <MenuItem value="winner-remains-on-court">
            Winner remains on court
          </MenuItem>
          <MenuItem value="points-tournament">Points tournament</MenuItem>
          <MenuItem value="points-tournament-with-group-face">
            Points tournament with group face
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="members-select-label">Members</InputLabel>
        <Select
          labelId="members-select-label"
          id="members-select"
          value={members}
          label="Members"
          onChange={handleMembersChange}
          className={styles.input}
        >
          <MenuItem value="teams">Teams</MenuItem>
          <MenuItem value="countrys">Countrys</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Number of matches"
        type="number"
        value={numMatches}
        onChange={handleNumMatchesChange}
        fullWidth
        className={styles.input}
      />
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
      />
    </form>
  );
};

export default GeneralInfo;
