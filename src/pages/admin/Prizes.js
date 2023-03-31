import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { EmojiEvents as PrizesIcon } from "@mui/icons-material";
import axios from "axios";


const Prizes = () => {
  const [prizes, setPrizes] = useState([]);
  const [country, setCountry] = useState("Argentina");

  const handleCountry = () => {
    if (country === "Argentina") {
      setCountry("Brazil");
    } else if (country === "Brazil") {
      setCountry("United States");
    } else {
      setCountry("Argentina");
    }
  }
  
  useEffect(() => {
    axios.get("http://localhost:3001/api/prizes").then((res) => {
      console.log(res.data)
      setPrizes(res.data);
    })
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
          sx={{ marginRight: "10px" }}
          startIcon={<PrizesIcon />}
          onClick={() => {
            () => handleCountry("Argentina");
          }}
        >
          ARGENTINA
        </Button>
        <Button
          sx={{ marginRight: "10px" }}
          startIcon={<PrizesIcon />}
          onClick={() => {
            () => handleCountry("Brazil");
          }}
        >
          BRAZIL
        </Button>
        <Button
          startIcon={<PrizesIcon />}
          onClick={() => {
            () => handleCountry("USA");
          }}
        >
          UNITED STATES
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
            <Box key={prize.country} sx={{ marginX: 2 }}>
              <Typography variant="h6" align="center">
                {prize.country}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PrizesIcon sx={{ fontSize: 40 }} />
                <Typography variant="h5" align="center">
                  1st Prize: {prize.first.Argentina}
                </Typography>
                <Typography variant="h5" align="center">
                  2nd Prize: {prize.second.Argentina}
                </Typography>
                <Typography variant="h5" align="center">
                  3rd Prize: {prize.third.Argentina}
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
