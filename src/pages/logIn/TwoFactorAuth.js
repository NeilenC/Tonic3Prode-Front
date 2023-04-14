import { Box, Button, Container, Typography, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import notp from "notp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import qrcode from "qrcode";

const TwoFactorAuth = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [secret, setSecret] = useState("");
  const [QRCodeImage, setQRCodeImage] = useState("");
  const [firstQR, setFirstQR] = useState(true);

  const generateQRCode = async (secret) => {
    console.log(secret, "secret");
    const otpauthUrl = `otpauth://totp/Gambet?secret=${secret}`;
    console.log(otpauthUrl, "otpauthUrl");
    try {
      const imageUrl = await qrcode.toDataURL(otpauthUrl);
      setQRCodeImage(imageUrl);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = localStorage.getItem("uid");
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/2FA/verify",
        {
          uid: uid,
          token: verificationCode,
        }
      );
      toast.success(response.data.message);
      window.location.href = "http://localhost:3000/home";
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const handleGenerateVerificationCode = async (e) => {
    e.preventDefault();
    try {
      if (firstQR) {
        const uid = localStorage.getItem("uid");
        const res = await axios.post(
          `http://localhost:3001/api/users/twofactor/${uid}`
        );
        setSecret(res.data.secret); // Guardamos el nuevo secreto generado en el backend
        toast.success("Verification code generated successfully!");
        generateQRCode(res.data.secret);
        setFirstQR(false);
      } else {
        toast.error("Verification code already generated");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate verification code. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <Container component="main" maxWidth="xs" sx={{ borderRadius: 8 }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "0.25px solid lightblue",
            borderRadius: "5px",
            height: QRCodeImage ? "550px" : "375px",
            padding: "30px",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mt: 5 }}>
            2FA VERIFICATION
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                padding: "10px 20px",
                fontSize: "0.9rem",
              }}
              onClick={handleGenerateVerificationCode}
            >
              GENERATE CODE
            </Button>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              {QRCodeImage && <img src={QRCodeImage} alt="2FA QR Code" />}
            </Box>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="verificationCode"
              label="Verification Code"
              name="verificationCode"
              autoComplete="verificationCode"
              autoFocus
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                padding: "10px 20px",
                fontSize: "0.9rem",
              }}
              onClick={handleSubmit}
            >
              VERIFY CODE
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default TwoFactorAuth;
