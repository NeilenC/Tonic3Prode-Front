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
  TextField,
  Button,
  Modal,
  Box,
} from "@mui/material";

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState({});
  const [editedUser, setEditedUser] = React.useState({});

  useEffect(() => {
    async function searchUsers() {
      const uid = localStorage.getItem("uid");
      const response = await axios.get(
        `http://localhost:3001/api/users/${uid}`
      );
      setUsers(response.data);
      setFilteredUsers(response.data);
    }
    searchUsers();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    const filteredUsers = users.filter((userData) => {
      const searchString =
        userData.username +
        userData.rol +
        userData.name +
        userData.lastName +
        userData.email +
        userData.address +
        userData.country +
        userData.cellphone +
        userData.tournaments +
        userData._id +
        userData.uid;
      return searchString.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(filteredUsers);
    setSearchTerm(searchTerm);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditedUser(user);
    setOpen(true);
  };

  const handleDeleteUser = (user) => {
    setEditingUser(user);
    setEditedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveChanges = () => {
    // aquí podrías enviar los cambios a la API para que se actualicen en la base de datos
    // y luego actualizar la tabla localmente
    const updatedUsers = users.map((user) => {
      if (user._id === editingUser._id) {
        return { ...user, ...editedUser };
      }
      return user;
    });
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={8}>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Actions</TableCell>
                <TableCell>UserName</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>LastName</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>address</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Cellphone</TableCell>
                <TableCell>Torneos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((userData) => (
                <TableRow key={userData._id}>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleEditUser(userData)}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDeleteUser(userData)}>
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>{userData.username}</TableCell>
                  <TableCell>{userData.rol}</TableCell>
                  <TableCell>{userData.name}</TableCell>
                  <TableCell>{userData.lastName}</TableCell>
                  <TableCell>{userData.email}</TableCell>
                  <TableCell>{userData.address}</TableCell>
                  <TableCell>{userData.country}</TableCell>
                  <TableCell>{userData.cellphone}</TableCell>
                  <TableCell>{userData.tournaments}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              minWidth: 400,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Editar usuario
            </Typography>
            <TextField
              label="UserName"
              name="username"
              value={editedUser.username}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Role"
              name="rol"
              value={editedUser.rol}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Name"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="LastName"
              name="lastName"
              value={editedUser.lastName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Address"
              name="address"
              value={editedUser.address}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Country"
              name="country"
              value={editedUser.country}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Cellphone"
              name="cellphone"
              value={editedUser.cellphone}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Torneos"
              name="tournaments"
              value={editedUser.tournaments}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </Box>
        </Modal>
      </Grid>
    </Grid>
  );
};

export default Users;
