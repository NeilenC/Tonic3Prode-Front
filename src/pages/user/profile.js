import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: theme.palette.success.main,
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const profile = () => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [uid, setUid] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [address, setAddress] = useState("");
  const [locale, setLocale] = useState('en');

  

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
  }, []);
  

  const handleLocaleChange = (e) => {
    setLocale(e.target.value);
  };

  const languages = [
    { value: null, label: '-' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'pt', label: 'Portugues' },
  ];

//Obtenemos info usuario
  async function getUser(uid) {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${uid}`);
      const data = await response.json();
      setCellphone(data.cellphone);
      setAddress(data.address);
      return data;
    } catch (err) {
      return err;
    }
  }
  
  useEffect(() => {
    getUser();
  }, [uid]);

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/update/${uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cellphone,
            address,
          }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setOpen(true);
      }
      return data;
    } catch (error) {
      return error
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
    // flexDirection={column}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "column",
      }}
      noValidate
      autoComplete="on"
    >
      <div>
        <TextField
          label="Dirección"
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          margin="normal"
          label="Numero celular"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setCellphone(e.target.value)}
        />
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        Deseo recibir notificaciones
      </div>
      Cambiar idioma: <br/>
            <select value={locale} onChange={handleLocaleChange}>
        {languages.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSave}
      >
        Guardar cambios
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <SnackbarContent
          className={useStyles.success}
          message={
            <span className={useStyles.message}>
              <CheckCircleIcon className={useStyles.icon} />
              Cambios guardados con éxito
            </span>
          }
        />
      </Snackbar>
    </Box>
  );
};

export default profile;
