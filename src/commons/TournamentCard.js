import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Divider, Button } from "@mui/material";
import { format } from "date-fns";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { Identity } from "@mui/base";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";

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

const TournamentCard = ({ tournament, userId , userUid}) => {
  const [inscript, setInscript] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(
    JSON.stringify(localStorage.getItem("uid")) || null
  );

  useEffect(() => {
    console.log("user", userId );
    console.log("users tournament", tournament.users);
    if (tournament.users.includes(userId)) {
      setInscript(true);
    } else {
      setInscript(false);
    }
    console.log(inscript);
  }, []);
  console.log("tournament name", tournament.title);
  console.log("tournament users", tournament.users);
  console.log("usuario inscripto", inscript);

  const handleAddusertoTournament = async () => {
    try{

      const response = await axios.put(
        `http://localhost:3001/api/tournaments/${tournament._id}/${userId}`
    );
    console.log(response.data);
    toast.success("You have been registered in the tournament!");
  } catch {
    console.log(error)
  }
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
        {inscript === false ? (
          <Button onClick={()=> {handleAddusertoTournament; 
            router.push(`/tournamentHome/${tournament._id}`)}}>
            Sing Up Tournament
          </Button>
        ) : (
          <Button
            style={{ textDecoration: "none" }}
            onClick={() => router.push(`/tournamentHome/${tournament._id}`)}
          >
            View Tournament
          </Button>
        )}
      </StyledCardContent>
    </StyledCard>
  );
};

export default TournamentCard;
