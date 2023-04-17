import React from "react";
import { Avatar, Typography, Box, Card } from "@mui/material";
import styles from "../../styles/ranking/podium.module.css";
import rankingPodium from "@/fakeData/rankingPodium";

const Podium = ({ ranking }) => {
  return (
    <Box className={styles.podiumBox}>
      <Card className={styles.thirdCard}>
        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
          3°
        </Typography>
        <Avatar
          alt={ranking[2]?.userId?.username}
          src={`https://img.freepik.com/foto-gratis/retrato-hermosa-modelo-rubia-sonriente-vestida-ropa-hipster-verano_158538-5482.jpg`}
          className={styles.thirdAvatar}
        >
          3
        </Avatar>
        <Typography variant="subtitle1">
          {ranking[2]?.userId?.username}
        </Typography>
        <Typography variant="subtitle1">{ranking[2]?.score}</Typography>
      </Card>
      <Card className={styles.firstCard}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          1°
        </Typography>
        <Avatar
          alt={ranking[0]?.userId?.username}
          src={`https://img.freepik.com/foto-gratis/retrato-hermosa-modelo-rubia-sonriente-vestida-ropa-hipster-verano_158538-5482.jpg`}
          className={styles.firstAvatar}
        >
          1
        </Avatar>
        <Typography variant="h6">{ranking[0]?.userId?.username}</Typography>
        <Typography variant="h6">{ranking[0]?.score}</Typography>
      </Card>
      <Card className={styles.secondCard}>
        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
          2°
        </Typography>
        <Avatar
          alt={ranking[1]?.userId?.username}
          src={`https://img.freepik.com/foto-gratis/retrato-hermosa-modelo-rubia-sonriente-vestida-ropa-hipster-verano_158538-5482.jpg`}
          className={styles.secondAvatar}
        >
          2
        </Avatar>
        <Typography variant="subtitle1">
          {ranking[1]?.userId?.username}
        </Typography>
        <Typography variant="subtitle1">{ranking[1]?.score}</Typography>
      </Card>
    </Box>
  );
};

export default Podium;
