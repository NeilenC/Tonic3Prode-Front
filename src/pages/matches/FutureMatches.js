import React from 'react';
import { CardContent, Typography } from '@mui/material';
import styles from "../../styles/matches/FutureMatches.module.css";
import Grid from './Grid';

const FutureMatches = () => {
  return (
    <CardContent className={styles.global}>
      <div className={styles.title}>
        <Typography variant="h5">Future Matches</Typography>
      </div>
      <div className={styles['grid-box']}>
        <Grid />
      </div>
    </CardContent>
  );
};

export default FutureMatches;