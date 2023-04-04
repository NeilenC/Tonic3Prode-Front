import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { EmojiEvents as PrizesIcon } from "@mui/icons-material";
import axios from "axios";

const Prizes = () => {
  const [prizes, setPrizes] = useState([]);
  const [country, setCountry] = useState("Argentina");

  const handleCountry = (country) => {
    setCountry(country);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/api/prizes").then((res) => {
      console.log(res.data);
      setPrizes(res.data);
    });
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
          alignItems: "center",
          marginTop: "20px",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Button
          variant={country === "Argentina" ? "contained" : "outlined"}
          color="primary"
          sx={{ marginRight: "10px" }}
          startIcon={<PrizesIcon />}
          onClick={() => handleCountry("Argentina")}
        >
          Argentina
        </Button>
        <Button
          variant={country === "Brazil" ? "contained" : "outlined"}
          color="primary"
          sx={{ marginRight: "10px" }}
          startIcon={<PrizesIcon />}
          onClick={() => handleCountry("Brazil")}
        >
          Brazil
        </Button>
        <Button
          variant={country === "United States" ? "contained" : "outlined"}
          color="primary"
          startIcon={<PrizesIcon />}
          onClick={() => handleCountry("United States")}
        >
          United States
        </Button>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px",
            alignItems: "center",
            marginTop: "20px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {prizes.map((prize) => (
            <Box
              key={prize.country}
              sx={{
                width: "300px",
                margin: "10px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                overflow: "hidden",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                align="center"
                color="primary"
                sx={{ marginBottom: "10px" }}
              >
                {prize.country}
              </Typography>
              <PrizesIcon
                sx={{ fontSize: "40px", marginBottom: "10px" }}
                color="primary"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  align="center"
                  color="textPrimary"
                  sx={{ marginBottom: "10px" }}
                >
                  1st Prize: {prize.first[country]}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="textPrimary"
                  sx={{ marginBottom: "10px" }}
                >
                  2nd Prize: {prize.second[country]}
                </Typography>
                <Typography variant="h5" align="center" color="textPrimary">
                  3rd Prize: {prize.third[country]}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Prizes;
