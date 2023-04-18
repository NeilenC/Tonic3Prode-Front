import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { EmojiEvents as PrizesIcon } from "@mui/icons-material";
import customAxios from "../../../utils/customAxios";
import { useRouter } from "next/router";
import axios from "axios";

const Prizes = () => {
  const router = useRouter();
  const [filteredPrizes, setFilteredPrizes] = useState([]);
  const [country, setCountry] = useState("");
  const currency = ["AR$ ", "BRZ ", "U$D "];

  useEffect(() => {
    const tournament = router.query.id;
    const uid = localStorage.getItem("uid");
    axios
      .get(`http://localhost:3001/api/users/search/${uid}`)
      .then((res) => {
        setCountry(res.data.country);
      })
      .catch((error) => {
        console.log(error);
      });

    customAxios
      .get("http://localhost:3001/api/prizes")
      .then((res) => {
        const filteredPrizes = res.data.filter(
          (prize) => prize.tournament === tournament
        );
        setFilteredPrizes(filteredPrizes);
      })
      .catch((error) => {
        console.log(error);
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
          sx={{
            marginRight: { xs: "0", md: "10px" },
            width: { xs: "100%", md: "auto" },
            marginBottom: { xs: "10px", md: "0" },
          }}
          startIcon={<PrizesIcon />}
        >
          {country}
        </Button>
      </Box>

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
        {filteredPrizes.length > 0 && (
          <Box sx={{ marginX: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: 300,
              }}
            >
              <Typography color="primary" variant="h2" align="center">
                <PrizesIcon style={{ fontSize: "65px" }} />
              </Typography>

              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  padding: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  variant="h6"
                  align="center"
                  style={{ color: "lightseagreen" }}
                >
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ color: "blue", opacity: 0.8 }}
                  >
                    {" "}
                    FIRST PRIZE{" "}
                  </Typography>

                  {country === "Argentina"
                    ? currency[0]
                      ? currency[0]
                      : ""
                    : ""}
                  {country === "Brazil" ? (currency[1] ? currency[1] : "") : ""}
                  {country === "USA" ? (currency[2] ? currency[2] : "") : ""}
                  {filteredPrizes[0].firstPrize[country]}
                </Typography>
              </Box>

              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  marginTop: 10,
                  padding: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  variant="h6"
                  align="center"
                  style={{ color: "lightseagreen" }}
                >
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ color: "blue", opacity: 0.8 }}
                  >
                    {" "}
                    SECOND PRIZE{" "}
                  </Typography>
                  {country === "Argentina"
                    ? currency[0]
                      ? currency[0]
                      : ""
                    : ""}
                  {country === "Brazil" ? (currency[1] ? currency[1] : "") : ""}
                  {country === "USA" ? (currency[2] ? currency[2] : "") : ""}
                  {filteredPrizes[0].secondPrize[country]}
                </Typography>
              </Box>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  marginTop: 10,
                  padding: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  variant="h6"
                  align="center"
                  style={{ color: "lightseagreen" }}
                >
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ color: "blue", opacity: 0.8 }}
                  >
                    {" "}
                    THIRD PRIZE{" "}
                  </Typography>
                  {country === "Argentina"
                    ? currency[0]
                      ? currency[0]
                      : ""
                    : ""}
                  {country === "Brazil" ? (currency[1] ? currency[1] : "") : ""}
                  {country === "USA" ? (currency[2] ? currency[2] : "") : ""}
                  {filteredPrizes[0].thirdPrize[country]}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Prizes;
