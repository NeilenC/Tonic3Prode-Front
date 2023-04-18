import React from "react";
import { Avatar, Typography, Box, Card } from "@mui/material";
import styles from "../../styles/ranking/podium.module.css";
import rankingPodium from "@/Data/rankingPodium";
import userPhoto from "../../../public/user.jpeg";

const Podium = ({ ranking }) => {
  return (
    <Box className={styles.podiumBox}>
      <Card className={styles.thirdCard}>
        <Avatar
          alt={ranking[2]?.userId?.username}
          src={userPhoto}
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
        <Avatar
          alt={ranking[0]?.userId?.username}
          src={userPhoto}
          className={styles.firstAvatar}
        >
          1
        </Avatar>
        <Typography variant="h6">{ranking[0]?.userId?.username}</Typography>
        <Typography variant="h6">{ranking[0]?.score}</Typography>
      </Card>
      <Card className={styles.secondCard}>
        <Avatar
          alt={ranking[1]?.userId?.username}
          src={userPhoto}
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
