import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Checkbox, Typography } from "@mui/material";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import SetIdiomas from "@/commons/SetIdiomas";
import ReactInputMask from "react-input-mask";

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

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
  }, []);

  //Obtenemos info usuario
  async function getUser(uid) {
    try {
      const response = await fetch(`http://localhost:3001/api/users/search/${uid}`);
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
      return error;
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
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "0.5vh solid grey",
        maxWidth: "50%",
        margin: "auto",
        p: "2% 1.5% 2% 1.5% ",
        mt: "2%",
      }}
      noValidate
      autoComplete="on"
    >
      <Typography component="h1" variant="h6" color="#454546" marginTop="3%">
        Modificar datos de usuario:
      </Typography>

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <SnackbarContent
          className={useStyles.success}
          message={
            <span className={useStyles.message}>
              <CheckCircleIcon className={useStyles.icon} />
            </span>
          }
        />
      </Snackbar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "3%",
          marginTop: "3%",
        }}
      >
        <TextField
          mt="5%"
          label="Dirección"
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setAddress(e.target.value)}
        />
        <ReactInputMask
          mask="+99-999-99999999"
          maskChar=""
          onChange={(e) => setCellphone(e.target.value)}
        >
          {() => (
            <TextField
              id="Cellphone"
              type="text"
              label="Numero celular"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="+54-911-12345678"
              required={true}
            />
          )}
        </ReactInputMask>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography component="h1" variant="h6" color="#454546" marginTop="3%">
          Deseo recibir notificaciones
        </Typography>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          component="p"
          variant="p"
          color="#454546"
          marginTop="3%"
          marginLeft="1.5%"
        >
          Cambiar idioma:
        </Typography>
        <SetIdiomas />
      </div>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSave}
      >
        Guardar cambios
      </Button>
    </Box>
  );
};

export default profile;
