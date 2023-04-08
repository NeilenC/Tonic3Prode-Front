import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Divider, Button } from "@mui/material";
import { format } from "date-fns";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { Identity } from "@mui/base";
import { useRouter } from "next/router";

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
});

const StyledImgContainer = styled("div")({
  width: "100%",
  maxHeight: "150px",
  overflow: "hidden",
});

const StyledImg = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const StyledCardContent = styled(CardContent)({
  flex: 1,
});

const TournamentCard = ({ tournament }) => {
  const router = useRouter();
  const [user, setUser] = useState(
    JSON.stringify(localStorage.getItem("uid")) || null
  );
  const [inscript, setInscript] = useState(false);

  useEffect(() => {
    let uid = user.replace(/"/g, "");
    console.log("IDDDD", uid);
    if (tournament.users.includes(uid)) {
      setInscript(true);
    } else {
      setInscript(false);
    }
  }, []);
  console.log("tournament name", tournament.title);
  console.log("tournament users", tournament.users);
  console.log("usuario inscripto", inscript);

  const handleAddusertoTournament = async () => {
    let uid = user.replace(/"/g, "");
    const response = await axios.post(
      `http://localhost:3001/api/tournaments/${tournament._id}/user`,
      {
        uid: uid,
      }
    );
  };

  // const handleCardClick = () => {
  //   window.location.href = `/tournamentHome/${tournament._id}`;
  // };

  return (
    <StyledCard
      sx={{
        margin: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
        },
      }}
    >
      <StyledImgContainer>
        <StyledImg src={tournament.image_url} alt="Tournament" />
      </StyledImgContainer>
      <StyledCardContent sx={{ textAlign: "center" }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {tournament.title}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          {format(new Date(tournament.beginning), "MM/dd/yyyy")} -{" "}
          {format(new Date(tournament.ending), "MM/dd/yyyy")}{" "}
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Stage: {tournament.stage}
        </Typography>
        <Divider sx={{ my: 2 }} />
        {inscript === true ? (
          <Button onClick={handleAddusertoTournament}>
            Inscirbir en torneo
          </Button>
        ) : (
          <Button
            style={{ textDecoration: "none" }}
            onClick={() => router.push(`/tournamentHome/${tournament._id}`)}
          >
            Ingresar al torneo
          </Button>
        )}
      </StyledCardContent>
    </StyledCard>
  );
};

export default TournamentCard;
