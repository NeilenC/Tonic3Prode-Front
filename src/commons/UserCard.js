import React from "react";
import { Card, CardContent } from "@mui/material";
import { ArrowUpward, ArrowDownward, Remove } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import styles from "@/styles/commons/userCard.module.css";

const UserCard = ({ user, index }) => {
  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <div className={styles.cardColumn}>
          <p>{index+1}</p>
        </div>
        <div className={styles.cardColumn}>
          <p>{user.rank}</p>
        </div>
        <div className={styles.cardColumn}>
          <Avatar
            alt={user.userId.userName}
            src={user.avatarUrl}
            className={styles.avatar}
          />
        </div>
        <div className={styles.cardColumn}>
          <p>{user.userId.username}</p>
        </div>
        <div className={styles.cardColumn}>
          <p>{user.score}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
