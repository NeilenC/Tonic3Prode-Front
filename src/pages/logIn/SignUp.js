
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { signUpGoogle } from "../../../utils/functions";
import { auth } from "../../../utils/firebaseConfig";
import GoogleIcon from "@mui/icons-material/Google";
import { LoginForm } from "./LoginForm";
import { useSelector, useDispatch } from "react-redux";

import { useIntl } from "react-intl";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const SignUp = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const firstLogin = useSelector((state) => state.firstLogin);
  const dispatch = useDispatch();

  const intl = useIntl();


  const handleSignUpGoogle = () => {
    signUpGoogle(auth, dispatch);
  };

  useEffect(() => {}, [firstLogin]);

  return (
    <>
      <ToastContainer />
      {!firstLogin && (
        <>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "0.25px solid lightblue",
                borderRadius: "5px",
                height: "300px",
              }}
            >
              <Typography component="h1" variant="h5" sx={{ mt: 5 }}>
              {intl.formatMessage({ id: "welcome" })}
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <Button
                  sx={{ mt: 10, mb: 2 }}
                  fullWidth
                  onClick={handleSignUpGoogle}
                  variant="outlined"
                >
                  <GoogleIcon />
                  {intl.formatMessage({ id: "signup" })}
                </Button>
              </Box>
            </Box>
          </Container>
        </>
      )}
      {firstLogin && <LoginForm />}
    </>
  );
};

