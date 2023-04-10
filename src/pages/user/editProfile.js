import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Checkbox, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import { createStyles } from "@mui/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SetIdiomas from "@/commons/SetIdiomas";
import ReactInputMask from "react-input-mask";
import { useSelector } from "react-redux";

const useStyles = createStyles((theme) => ({
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

const Profile = () => {
  const userInfo = useSelector((state) => state.userInfo);

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [cellphone, setCellphone] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUserName] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
  }, []);

  useEffect(() => {
    setCellphone(userInfo.cellphone);
    setAddress(userInfo.address);
    setUserName(userInfo.username);
  }, []);

  const handleSave = async () => {
    if (userInfo) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/users/update/${uid}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
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
    <Box>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid grey",
          padding: "10%",
          borderRadius: "5px ",
          maxWidth: "95%",
          margin: " 5% auto",
          backgroundColor: "#F7F7F7",
          padding: "2rem",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
        }}
        noValidate
        autoComplete="on"
      >
        <Typography component="h1" variant="h6" color="#454546" marginTop="3%">
          Modificar datos:
        </Typography>

        <TextField
          mt="5%"
          label="User name"
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setUserName(e.target.value)}
          my={2}
        />

        <div
         
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
        </div>
        <div>
          <ReactInputMask
            mask="+99-999-99999999"
            maskChar=""
            onChange={(e) => setCellphone(e.target.value)}
          >
            {() => (
              <TextField
                mt="5%"
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
          <Typography
            component="h1"
            variant="h6"
            color="#454546"
            marginTop="3%"
          >
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
      </Box>
    </Box>
  );
};

export default Profile;
