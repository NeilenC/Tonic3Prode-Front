import React from "react";
import { Card, CardContent } from "@mui/material";
import { ArrowUpward, ArrowDownward, Remove } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import styles from "@/styles/commons/userCard.module.css";

const UserCard = ({ user }) => {
  const statusIcon =
    user.status === "advance" ? (
      <ArrowUpward style={{ color: "green" }} />
    ) : user.status === "retrograde" ? (
      <ArrowDownward style={{ color: "red" }} />
    ) : (
      <Remove style={{ color: "gray" }} />
    );

  return (
    <Card className={styles.card}>
      <CardContent className={styles.content}>
        <div className={styles.cardColumn}>
          {statusIcon}
        </div>
        <div className={styles.cardColumn}>
          <p>{user.rank}</p>
        </div>
        <div className={styles.cardColumn}>
          <Avatar
            alt={user.userName}
            src={user.avatarUrl}
            className={styles.avatar}
          />
        </div>
        <div className={styles.cardColumn}>
          <p>{user.userName}</p>
        </div>
        <div className={styles.cardColumn}>
          <p>{user.points}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
