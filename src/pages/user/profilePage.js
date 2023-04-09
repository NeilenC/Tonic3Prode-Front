import { Box, Typography, Grid, Button } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const profilePage = () => {
  const userInfo = useSelector((state) => state.userInfo);

  const [cellphone, setCellphone] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userInfo) {
      setCellphone(userInfo.cellphone);
      setAddress(userInfo.address);
      setUserName(userInfo.username);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid grey",
        padding: "20px",
        borderRadius: "5px ",
        width: "90%",
        maxWidth: "700px",
        margin: " 5% auto",
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            sx={{ textAlign: { xs: "center", md: "left" }, mb: 1 }}
          >
            <div>Nombre de usuario: </div>
            {username}
          </Typography>
          <Typography
            variant="h5"
            sx={{ textAlign: { xs: "center", md: "left" }, mb: 1 }}
          >
            <div> E-mail: </div>
            {email}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            sx={{ textAlign: { xs: "center", md: "left" }, mb: 1 }}
          >
            <div>Dirección: </div>
            {address}
          </Typography>
          <Typography
            variant="h5"
            sx={{ textAlign: { xs: "center", md: "left" }, mb: 1 }}
          >
            <div> Teléfono de contacto: </div> {cellphone}
          </Typography>
        </Grid>
      </Grid>

      <Link href="/user/profile">
        <Button sx={{ mt: 3, alignSelf: "flex-end" }}>
          <Typography
            variant="body1"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Cambiar datos de usuario
          </Typography>
        </Button>
      </Link>
    </Box>
  );
};

export default profilePage;
