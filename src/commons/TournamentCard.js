import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Divider, Button } from "@mui/material";
import { format } from "date-fns";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { Identity } from "@mui/base";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import { useIntl } from "react-intl";

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

const TournamentCard = ({ tournament, user }) => {
  const [inscript, setInscript] = useState(false);
  const router = useRouter();
  const intl = useIntl();

  useEffect(() => {
     console.log("CHEQUEO", tournament.users.includes(user._id));
    if (tournament.users.includes(user._id)) {
      setInscript(true);
    } else {
      setInscript(false);
    }
  }, []);

  const handleAddusertoTournament = async () => {
    try{
      const response = await axios.put(
        `http://localhost:3001/api/tournaments/${tournament._id}/addme`, {userId: user._id, userUid: user.uid});
    console.log(response.data);
    toast.success("You have been registered in the tournament!");
    router.push(`/tournamentHome/${tournament._id}`);
  } catch(error) {
    console.log(error)
  }
  };

    useEffect(() => {
      if (tournament.users.includes(user._id)) {
        setInscript(true);
      } else {
        setInscript(false);
      }
    }, [handleAddusertoTournament]);

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
          <Button onClick={()=>handleAddusertoTournament()}>
            {intl.formatMessage({ id: "register" })} 
            {/* Sign up tournament */}
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
