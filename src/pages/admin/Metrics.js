import React from "react";
import { Card, Grid, Paper, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
} from "recharts";

const Metrics = () => {
  const usersCount = 13579; // Cantidad ficticia de usuarios
  const tournamentsCount = 27; // Cantidad ficticia de torneos
  const maleUsersCount = 7000; // Cantidad ficticia de usuarios masculinos
  const femaleUsersCount = 6579; // Cantidad ficticia de usuarios femeninos
  const basketballTournamentsCount = 10; // Cantidad ficticia de torneos de baloncesto
  const soccerTournamentsCount = 8; // Cantidad ficticia de torneos de fútbol
  const volleyballTournamentsCount = 5; // Cantidad ficticia de torneos de voleibol
  const averageSessionTime = 25; // Tiempo promedio que los usuarios pasan en la plataforma por sesión

  const genderData = [
    { name: "Masculino", value: maleUsersCount },
    { name: "Femenino", value: femaleUsersCount },
  ];

  const sportData = [
    { name: "Baloncesto", value: basketballTournamentsCount },
    { name: "Fútbol", value: soccerTournamentsCount },
    { name: "Voleibol", value: volleyballTournamentsCount },
  ];

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} sm={6} md={4}>
        <Card sx ={{p:2}}>
          <Typography variant="h6">Usuarios</Typography>
          <Typography variant="h3">{usersCount}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx ={{p:2}}>
          <Typography variant="h6">Torneos</Typography>
          <Typography variant="h3">{tournamentsCount}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx ={{p:2}}>
          <Typography variant="h6">Porcentaje de participantes</Typography>
          <Typography variant="h3">75%</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Card sx ={{p:2}}>
          <Typography variant="h6">
            Distribución de usuarios por género
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
              >
                <Cell fill="#0088FE" />
                <Cell fill="#00C49F" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Card sx ={{p:2}}>
          <Typography variant="h6">
            Distribución de torneos por deporte
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sportData}>
              <Bar dataKey="value" fill="#8884d8" />
              <XAxis dataKey="name" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx ={{p:2}}>
          <Typography variant="h6">Tiempo promedio por sesión</Typography>
          <Typography variant="h3">{averageSessionTime} min</Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Metrics;
