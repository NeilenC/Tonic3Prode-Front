import React from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { format } from "date-fns";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
});

const StyledImgContainer = styled("div")({
  width: "100%",
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
        <StyledImg
          src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blte9c9176021b28a67/635982a86c3afa0bf5601819/FgBCe58WAAADilF.jpg"
          alt="Tournament"
        />
      </StyledImgContainer>
      <StyledCardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {tournament.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {format(new Date(tournament.beginning), "MM/dd/yyyy")} -{" "}
          {format(new Date(tournament.ending), "MM/dd/yyyy")}{" "}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>  
        {tournament.stage} nd Round
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Teams:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {tournament.teams.length} teams are participating.
        </Typography>
      </StyledCardContent>
    </StyledCard>
  );
};

export default TournamentCard;