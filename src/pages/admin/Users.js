import axios from "axios";
import React, { useEffect } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const Users = () => {
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    async function searchUsers() {
      const uid = localStorage.getItem("uid");
      const response = await axios.get(
        `http://localhost:3001/api/users/${uid}`
      );
      setUsers(response.data);
    }
    searchUsers();
  }, []);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={8}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Nombre de usuario</TableCell>
                <TableCell>Correo electrónico</TableCell>
                <TableCell>UID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>País</TableCell>
                <TableCell>Teléfono celular</TableCell>
                <TableCell>Torneos</TableCell>
                <TableCell>__v</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((userData) => (
                <TableRow key={userData._id}>
                  <TableCell>{userData._id}</TableCell>
                  <TableCell>{userData.username}</TableCell>
                  <TableCell>{userData.email}</TableCell>
                  <TableCell>{userData.uid}</TableCell>
                  <TableCell>{userData.name}</TableCell>
                  <TableCell>{userData.lastName}</TableCell>
                  <TableCell>{userData.rol}</TableCell>
                  <TableCell>{userData.address}</TableCell>
                  <TableCell>{userData.country}</TableCell>
                  <TableCell>{userData.cellphone}</TableCell>
                  <TableCell>{userData.tournaments}</TableCell>
                  <TableCell>{userData.__v}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Users;
