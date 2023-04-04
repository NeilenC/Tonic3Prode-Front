"use client";

import React from "react";
import { Avatar, Typography, Box, Card } from "@mui/material";
import styles from "../../src/styles/ranking/podium.module.css";
import rankingPodium from "@/fakeData/rankingPodium";

const Podium = () => {
  return (
    <Box className={styles.podiumBox}>
      <Card className={styles.thirdCard}>
        <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
          3°
        </Typography>
        <Avatar
          alt={rankingPodium.thirdPlace.name}
          src={rankingPodium.thirdPlace.avatar}
          className={styles.thirdAvatar}
        >
          3
        </Avatar>
        <Typography variant="subtitle1" >
          {rankingPodium.thirdPlace.name}
        </Typography>
        <Typography variant="subtitle1">
          {rankingPodium.thirdPlace.points}
        </Typography>
      </Card>
      <Card className={styles.firstCard} >
      <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          1°
        </Typography>
        <Avatar
          alt={rankingPodium.firstPlace.name}
          src={rankingPodium.firstPlace.avatar}
          className={styles.firstAvatar}
        >
          1
        </Avatar>
        <Typography variant="h6" >
          {rankingPodium.firstPlace.name}
        </Typography>
        <Typography variant="h6" >
          {rankingPodium.firstPlace.points}
        </Typography>
      </Card>
      <Card className={styles.secondCard} >
        <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
          2°
        </Typography>
        <Avatar
          alt={rankingPodium.secondPlace.name}
          src={rankingPodium.secondPlace.avatar}
          className={styles.secondAvatar}
        >
          2
        </Avatar>
        <Typography variant="subtitle1" >
          {rankingPodium.secondPlace.name}
        </Typography>
        <Typography variant="subtitle1" >
          {rankingPodium.secondPlace.points}
        </Typography>
      </Card>
    </Box>
  );
};

export default Podium;