import React from "react";
import { CardContent, Typography } from "@mui/material";
import styles from "../../styles/matches/FutureMatches.module.css";
//import Grid from "./Grid";
import Slider from "../../commons/SliderHome";
import { FormattedMessage } from "react-intl";

const Fixture = () => {
  return (
    <CardContent className={styles.global}>
      <div className={styles.title}>
        <Typography variant="h5">
          <FormattedMessage id="matches" />
        </Typography>
      </div>
      <div>
        <Slider />
      </div>
    </CardContent>
  );
};

export default Fixture;
