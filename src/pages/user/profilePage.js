import { Box, Typography, Grid, Button } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SportsRoundedIcon from '@mui/icons-material/SportsRounded';

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
        padding: "10%",
        borderRadius: "5px ",
        maxWidth: "95%",
        margin: " 5% auto",
        backgroundColor: "#F7F7F7",
        padding: "2rem",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
        overflow: "hidden", 
      }}
    >
       <Grid item xs={12} md={6}
        container
        spacing={3}
        alignItems="center"
        sx={{
          flexDirection: "column",
        }}
      >
  
          <Typography
            variant="h5"
            component="div"
            align="center"
            sx={{
              marginBottom: "1rem",
              color: "#555555",
            }}
          >
           <p style={{ color: "#1976d2" }}><SportsRoundedIcon/> Nombre de usuario:</p>  {username}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            align="center"
            sx={{
              marginBottom: "1rem",
              color: "#555555",
            }}
          >
           <p style={{ color: "#1976d2" }}> <SportsRoundedIcon/> E-mail:</p> {email}
          </Typography>
     
          <Typography
            variant="h5"
            component="div"
            align="center"
            sx={{
              marginBottom: "1rem",
              color: "#555555",
            }}
          >
            <p style={{ color: "#1976d2" }}><SportsRoundedIcon/> Dirección:</p> {address}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            align="center"
            sx={{
              marginBottom: "1rem",
              color: "#555555",
            }}
          >
            <p style={{ color: "#1976d2" }}><SportsRoundedIcon/> Teléfono:</p> {cellphone}
          </Typography>
        </Grid>
     
      <Link href="/user/editProfile">
        <Button sx={{ mt: 3, alignSelf: "flex-end" }}>
          <Typography
            variant="body1"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Cambiar datos de usuario
          </Typography>
        </Button>
      </Link>
      <Link href="/home">
      <Button  sx={{ mt: 3, alignSelf: "flex-end", color:"inherit", justifyContent:"center"}}
          >Volver</Button>
      </Link>
    </Box>
  );
};

export default profilePage;
