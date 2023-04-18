import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import styles from "../styles/matches/MatchCard.module.css";

function MatchCard({ time, homeTeam, awayTeam }) {
  return (
      <CardContent className={styles.customCard}>
        <div className={styles.cardColumn}>
          <div className={styles.titleWrapper}>
            <Typography
              variant="subtitle1"
              align="center"
              className={styles.teamName}
            >
              {homeTeam.shortName}
            </Typography>
          </div>
        </div>
        <div className={styles.cardColumn}>
          <div className={styles.teamLogoWrapper}>
            <img
              src={homeTeam.logo_url}
              alt={homeTeam.nombre}
              className={styles.teamLogo}
            />
          </div>
        </div>
        <div className={styles.cardColumn}>
          <div className="date-container">
            <Typography
              variant="subtitle1"
              align="center"
              className={styles.matchDate}
            >
              {time}hs
            </Typography>
          </div>
        </div>
        <div className={styles.cardColumn}>
          <div className={styles.teamLogoWrapper}>
            <img
              src={awayTeam.logo_url}
              alt={awayTeam.nombre}
              className={styles.teamLogo}
            />
          </div>
        </div>
        <div className={styles.cardColumn}>
          <div className={styles.titleWrapper}>
            <Typography
              variant="subtitle1"
              align="center"
              className={styles.teamName}
            >
              {awayTeam.shortName}
            </Typography>
          </div>
          <div/>
        </div>
      </CardContent>
  );
}

export default MatchCard;
