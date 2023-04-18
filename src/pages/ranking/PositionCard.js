import React from "react";
import styles from "../../styles/ranking/positionCard.module.css";
import { Card } from "@mui/material";
import { useIntl } from "react-intl";

const PositionCard = ({ avatar, position, points }) => {
  const intl = useIntl()
  
  return (
    <Card className={styles.card}>
      <div className={styles.avatar}>
        <img src={user.avatar} alt="Avatar" />
      </div>
      <div className={styles.info}>
        <h2 className={styles.title}>
          {" "}
          {intl.formatMessage({ id: "puesto" })}
          {user.position}
        </h2>
        <p className={styles.points}>
          {user.points} {intl.formatMessage({ id: "points" })}
        </p>
      </div>
    </Card>
  );
};

export default PositionCard;