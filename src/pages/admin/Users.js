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
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [editingUser, setEditingUser] = React.useState({});
  const [editedUser, setEditedUser] = React.useState({});

  const [selectedRole, setSelectedRole] = React.useState(editedUser.rol);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openDeleteAllUsersModal, setOpenDeleteAllUsersModal] =
    React.useState(false);

  useEffect(() => {
    async function searchUsers() {
      const uid = localStorage.getItem("uid");
      const response = await axios.get(
        `http://localhost:3001/api/users/${uid}`
      );
      const otherUsers = response.data.filter(
        (eachUser) => eachUser.rol !== "superAdmin" && eachUser.uid !== uid
      );
      console.log("other", otherUsers);
      setUsers(otherUsers);

      setFilteredUsers(otherUsers);
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

  //función para abrir el modal de edit
  const handleEditUser = (user) => {
    setSelectedRole(user.rol);
    setEditingUser(user);
    setEditedUser(user);
    setOpenEditModal(true);
  };
  //funcion para abrir el modal de delete one
  const handleDeleteUser = (user) => {
    setEditingUser(user);
    setEditedUser(user);
    setOpenDeleteModal(true);
  };
  //funcion para abrir el modal de delete all
  const handleDeleteAllUsers = () => {
    setOpenDeleteAllUsersModal(true);
  };

  //funcion para confirmar el borrado de un usuario
  const handleDelete = async () => {
    const uid = localStorage.getItem("uid");
    const userLogged = await axios.get(
      `http://localhost:3001/api/users/search/${uid}`
    );

    //verifico que sea superAdmin y si es admin, que no borre otro admin
    if (editedUser.rol === "user" || userLogged.data.rol === "superAdmin") {
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/users/admin/${editedUser.uid}`,
          {
            uid: uid,
          }
        );
        // toast.success(response.data.message);
        const updatedUsers = users.filter(
          (user) => user.uid !== editedUser.uid
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        setOpenDeleteModal(false);
        console.log("eliminado correctamente");
        alert("user successfully eliminated");
      } catch (error) {
        console.log("error al eliminar");

        // toast.error(error.response.data.message);
      }
    } else {
      alert("you are not allowed to eliminate another admin");
      // toast.error()
      console.log("no se puede");
      setOpenDeleteModal(false);
    }
  };
  //funciones para volver
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const handleCloseDeleteAllUsersModal = () => {
    setOpenDeleteAllUsersModal(false);
  };

  //funcion para confirmar el borrado de todos los usuarios
  const handleConfirmDeleteAllUsers = async () => {
    const uid = localStorage.getItem("uid");
    const userLogged = await axios.get(
      `http://localhost:3001/api/users/search/${uid}`
    );

    //si es super Admin puede borrar a todos
    console.log("loggedddd", userLogged.data);
    if (userLogged.data.rol === "superAdmin") {
      try {
        const response = await axios.delete(
          "http://localhost:3001/api/users/superAdmin",
          {
            uid: uid,
          }
        );
        alert("users successfully eliminated");
        console.log("usuarios eliminados");
        setOpenDeleteAllUsersModal(false);
        setUsers([]);
        setFilteredUsers([]);
        // toast.success(response.data.message);
      } catch (error) {
        // toast.error(error.response.data.message);
        console.log("error al eliminar usuarios");
      }
    }
    //si es admin, solo borra a los que no son admins
    else {
      try {
        const response = await axios.delete(
          "http://localhost:3001/api/users/admins",
          {
            uid: uid,
          }
        );
        alert(response.data.message);
        const updatedUsers = users.filter((user) => user.rol !== "user");
        setOpenDeleteAllUsersModal(false);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        // toast.success(response.data.message);
      } catch (error) {
        // toast.error(error.response.data.message);
        console.log("error al eliminar usuarios");
      }
    }
  };

  //funcion para modificar rol de usuario
  const handleSaveChanges = async () => {
    const updatedUsers = users.map((user) => {
      if (user._id === editingUser._id) {
        return { ...user, ...editedUser };
      }
      return user;
    });
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setOpenEditModal(false);

    const uid = localStorage.getItem("uid");
    if (editedUser.rol === "admin") {
      try {
        const response = await axios.put(
          "http://localhost:3001/api/users/admin/updateToAdmin",
          {
            uid: uid,
            newAdminUid: editedUser.uid,
          }
        );
        console.log("subido a admin");
        alert("updated to admin succesfully");
        // toast.success(response.data.message);
      } catch (error) {
        // toast.error(error.response.data.message);
        console.log("error al subir a admin");
      }
    } else {
      try {
        const response = await axios.put(
          "http://localhost:3001/api/users/admin/removeFromAdmins",
          {
            uid: uid,
            newAdminUid: editedUser.uid,
          }
        );
        console.log("bajado a user");
        alert("removed from admins succesfully");
        // toast.success(response.data.message);
      } catch (error) {
        // toast.error(error.response.data.message);
        console.log("error al bajar a user");
      }
    }
  };

  const handleInputChange = (event) => {
    console.log("event", event);

    const { name, value } = event.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      {/* <ToastContainer /> */}
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
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteAllUsers}
          >
            Delete all users
          </Button>
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
                      <Button
                        variant="outlined"
                        onClick={() => handleEditUser(userData)}
                      >
                        Edit role
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteUser(userData)}
                      >
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
          <Modal open={openEditModal} onClose={handleCloseEditModal}>
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
                height: 200,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Editar usuario
              </Typography>

              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedRole}
                onChange={(event) => {
                  setSelectedRole(event.target.value);
                  setEditedUser((prev) => ({
                    ...prev,
                    rol: event.target.value,
                  }));
                }}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"user"}>User</MenuItem>
              </Select>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
              <Button onClick={handleCloseEditModal}>Volver</Button>
            </Box>
          </Modal>
          <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
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
                height: 200,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Está seguro de que desea eliminar este usuario?
              </Typography>
              <Button onClick={handleDelete}>Eliminar</Button>
              <Button onClick={handleCloseDeleteModal}>Volver</Button>
            </Box>
          </Modal>
          <Modal
            open={openDeleteAllUsersModal}
            onClose={handleCloseDeleteAllUsersModal}
          >
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
                height: 200,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Está seguro de que desea eliminar todos los usuarios?
              </Typography>
              <Button onClick={handleConfirmDeleteAllUsers}>Eliminar</Button>
              <Button onClick={handleCloseDeleteAllUsersModal}>Volver</Button>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </>
  );
};

export default Users;
