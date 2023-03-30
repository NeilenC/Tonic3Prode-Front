import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../../redux/reducers/userInfo";

export const LoginForm = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const userUid = useSelector((state) => state.uid);
  const email = userInfo.email;
  const nameGoogle = userInfo.name;
  const lastNameGoogle = userInfo.lastName;
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [cellphone, setCellphone] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    const uid = userUid;
    axios
      .post("http://localhost:3001/api/users/", {
        username: username,
        email: email,
        uid: uid,
        name: nameGoogle,
        lastName: lastNameGoogle,
        address: address,
        cellphone: cellphone,
      })
      .then((res) => {
        dispatch(
          setUserInfo({
            email: "",
            fullName: "",
          })
        );
        window.location.href = "http://localhost:3000/home";
        toast.success("Successfully Logged In !");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error, please try again !");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          REGISTER FORM
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            defaultValue={email}
            disabled={true}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            type="name"
            id="name"
            autoComplete="current-name"
            defaultValue={nameGoogle}
            disabled={true}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastname"
            label="Lastname"
            type="lastname"
            id="lastname"
            autoComplete="current-lastname"
            defaultValue={lastNameGoogle}
            disabled={true}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="address"
            label="Address"
            type="address"
            id="address"
            autoComplete="current-address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="cellphone"
            label="Cellphone"
            type="cellphone"
            id="cellphone"
            autoComplete="current-cellphone"
            onChange={(e) => setCellphone(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e) => handleClick(e)}
          >
            Register to GAMBET
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
