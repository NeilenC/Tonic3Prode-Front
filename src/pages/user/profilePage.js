import { Box, Typography, Grid, Button } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import userPhoto from "../../../public/user.jpeg";


const profilePage = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const intl = useIntl();

  const [cellphone, setCellphone] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhoto] = useState("");


  useEffect(() => {
    if (userInfo) {
      setCellphone(userInfo.cellphone);
      setAddress(userInfo.address);
      setUserName(userInfo.username);
      setEmail(userInfo.email);
      setPhoto(userInfo.photoURL);
    }
  }, [userInfo]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "10%",
        borderRadius: "5px ",
        maxWidth: "80%",
        margin: " 5% auto",
        backgroundColor: "#F7F7F7",
        padding: "2rem",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <img
        src={
          photoURL
            ? photoURL
            : "https://img2.freepng.es/20180426/bfe/kisspng-computer-icons-user-profile-5ae25c1f867d48.1548444315247841595509.jpg"
        }
        style={{ height: 100, width: 100 }}
      />
      <Grid
        item
        xs={12}
        md={6}
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
          <p style={{ color: "#1976d2" }}>
            {intl.formatMessage({ id: "username" })}
          </p>{" "}
          {username}
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
          <p style={{ color: "#1976d2" }}> E-mail</p> {email}
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
          <p style={{ color: "#1976d2" }}>
            {intl.formatMessage({ id: "address" })}
          </p>{" "}
          {address}
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
          <p style={{ color: "#1976d2" }}>
            {intl.formatMessage({ id: "cell" })}
          </p>{" "}
          {cellphone}
        </Typography>
      </Grid>

      <Link href="/user/editProfile">
        <Button 
        variant="outlined" 
        sx={{ mt: 3, alignSelf: "flex-center" }}>
          <Typography
            variant="body1"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            {intl.formatMessage({ id: "modify" })}
          </Typography>
        </Button>
      </Link>
      <Link href="/home">
        <Button
          variant="contained"
          sx={{
            mt: 3,
            alignSelf: "flex-center",
            color: "inherit",
            justifyContent: "center",
          }}
        >
          {intl.formatMessage({ id: "back" })}
        </Button>
      </Link>
    </Box>
  );
};

export default profilePage;
