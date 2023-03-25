import React from "react";
import styles from "../../styles/ranking/rankingCard.module.css";
import { Card } from "@mui/material";

const user = {name: "Natalia García", avatar: "https://img.freepik.com/foto-gratis/retrato-hermosa-modelo-rubia-sonriente-vestida-ropa-hipster-verano_158538-5482.jpg",
position: 17, points: 185}

const RankingCard = ({ avatar, position, points }) => {
  return (
    <Card className={styles.card}>
      <div className={styles.avatar}>
        <img src={user.avatar} alt="Avatar" />
      </div>
      <div className={styles.info}>
        <h2 className={styles.title}>Puesto {user.position}</h2>
        <p className={styles.points}>{user.points} Puntos</p>
      </div>
    </Card>
  );
};

export default RankingCard;