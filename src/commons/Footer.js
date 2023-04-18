import React from "react"
import { Grid, Paper, Typography } from '@mui/material';


function Footer() {

  return (
    <footer sx={{backgroundColor: '#f2f2f2',
    padding: 2,
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    maxWidth: '100%',
    }}>
      <Grid >
        <Grid item xs={12} sm={8} md={6} mt={4}>
        <Paper sx={{padding: 2,bgcolor:"#DEDEDE"}}>
            <Typography variant="p" align="flex-start">
            © 2023  Bit-Bang 
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;