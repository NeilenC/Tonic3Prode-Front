import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styles from "../../styles/ranking/positionCard.module.css";


export default function HomeButton({ title}) {
  return (
    <>
      <Box  className={styles.card}>
        <div >
          <Button  variant="outlined" size="large" sx={{border:"0"}}>
            <p className={styles.title}>{title}</p>
          </Button>
        </div>
      </Box>
    </>
  );
}
 