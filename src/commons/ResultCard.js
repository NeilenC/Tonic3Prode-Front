import React from "react";
import { Card, CardContent, InputBase, Typography } from "@mui/material";
import styles from "../styles/matches/ResultCard.module.css";

function ResultCard({ time, homeTeam, awayTeam, handleScoreChange, i }) {
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
      <InputBase
        className={styles.cardColumn}
        placeholder=""
        inputProps={{
          "aria-label": "score",
          min: "0",
          type: "number",
        }}
        value={homeTeam.score}
        onChange={(e) => handleScoreChange(i, 0, e)}
      />
      <div className={styles.cardColumn}>
        <div className="date-container">
          <Typography
            variant="subtitle1"
            align="center"
            className={styles.matchDate}
          >
            {time}Vs
          </Typography>
        </div>
      </div>
      <InputBase
        className={`${styles.cardColumn} ${styles.inputColumn}`}
        placeholder=""
        inputProps={{
          min: "0",
          type: "number",
          "aria-label": "score",
        }}
        value={awayTeam.score}
        onChange={(e) => handleScoreChange(i, 1, e)}
      />
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
        <div />
      </div>
    </CardContent>
  );
}

export default ResultCard;
