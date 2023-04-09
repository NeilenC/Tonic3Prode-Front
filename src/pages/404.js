import { Button, Typography } from "@mui/material";
import SportsIcon from '@mui/icons-material/Sports';
import { Box } from "@mui/system";
import {useRouter} from "next/router"
import React from "react";

const ErrorPage = () => {
const router = useRouter()

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "300%", marginBottom: "1rem", color:"#1976d2" }}>
        Error 404!
      </Typography>
      <Typography variant="h2" sx={{ fontSize: "170%", textAlign: "center", color:"1b1e23" }}>
        Lo sentimos, ha ocurrido un error.
      </Typography>
      <Button onClick={()=> {router.push("/home")}}> <SportsIcon/> Volver al inicio
     
      </Button>
    </Box>
  );
};

export default ErrorPage;
