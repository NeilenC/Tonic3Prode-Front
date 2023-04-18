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
  useMediaQuery,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";


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
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    async function searchUsers() {
      const response = await axios.get(
        `http://localhost:3001/api/users/${uid}`
      );
      const otherUsers = response.data.filter(
        (eachUser) => eachUser.rol !== "superAdmin" && eachUser.uid !== uid
      );
      setUsers(otherUsers);
      setFilteredUsers(otherUsers);
    }
    if (uid) {
      searchUsers();
    }
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
        const updatedUsers = users.filter(
          (user) => user.uid !== editedUser.uid
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        setOpenDeleteModal(false);
        toast.success("user successfully eliminated");
      } catch (error) {
        console.log("error al eliminar");
      }
    } else {
      toast.error("you are not allowed to eliminate another admin");
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
    if (userLogged.data.rol === "superAdmin") {
      try {
        const response = await axios.delete(
          "http://localhost:3001/api/users/superAdmin",
          {
            uid: uid,
          }
        );
        toast.success("users successfully eliminated");
        setOpenDeleteAllUsersModal(false);
        setUsers([]);
        setFilteredUsers([]);
      } catch (error) {
        toast.error(error.response.data.message);
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
        const updatedUsers = users.filter((user) => user.rol !== "user");
        setOpenDeleteAllUsersModal(false);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        toast.success("users successfully eliminated.");
      } catch (error) {
        toast.error("error when trying to eliminate users.");
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
    const userLogged = await axios.get(
      `http://localhost:3001/api/users/search/${uid}`
    );

    if (editedUser.rol === "admin") {
      try {
        const response = await axios.put(
          "http://localhost:3001/api/users/admin/updateToAdmin",
          {
            uid: uid,
            newAdminUid: editedUser.uid,
          }
        );
        toast.success("updated to admin succesfully");
      } catch (error) {
        toast.error("error al subir a admin");
      }
    } else if (
      editedUser.rol === "user" &&
      userLogged.data.rol === "superAdmin"
    ) {
      try {
        const response = await axios.put(
          "http://localhost:3001/api/users/admin/removeFromAdmins",
          {
            uid: uid,
            newAdminUid: editedUser.uid,
          }
        );
        toast.success("removed from admins succesfully");
      } catch (error) {
        toast.error("error al bajar a user");
      }
    } else {
      toast.error("you are not allowed to remove a user from admins");
      setUsers(users);
      setFilteredUsers(users);
    }
  };

  const handleInputChange = (event) => {

    const { name, value } = event.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          minWidth: isMobile ? "auto" : "auto",
          margin: "0 auto",
        }}
      >
        <input
          type="text"
          placeholder="Search User"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "20px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            width: "94%",
            fontSize: "0.9rem",
            height: "25px",
            margin: "20px auto",
            textAlign: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteAllUsers}
          >
            Delete all users
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>UserName</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Role</TableCell>
                <TableCell
                  style={{ fontWeight: "bold" }}
                  sx={{ display: isMobile ? "none" : "static" }}
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold" }}
                  sx={{ display: isMobile ? "none" : "static" }}
                >
                  LastName
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold" }}
                  sx={{ display: isMobile ? "none" : "static" }}
                >
                  Email
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold" }}
                  sx={{ display: isMobile ? "none" : "static" }}
                >
                  Address
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold" }}
                  sx={{ display: isMobile ? "none" : "static" }}
                >
                  Country
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold" }}
                  sx={{ display: isMobile ? "none" : "static" }}
                >
                  Cellphone
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((userData) => (
                <TableRow key={userData._id}>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="inherit"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditUser(userData)}
                      sx={{ mr: 1, width: "90px" }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      // sx={{ margin: "20px" }}
                      onClick={() => handleDeleteUser(userData)}
                      sx={{ width: "90px" }}
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
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Edit user
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
              sx={{ mb: 2 }}
            >
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"user"}>User</MenuItem>
            </Select>
            <Button onClick={handleCloseEditModal}>Back</Button>
            <Button variant="contained" onClick={handleSaveChanges}>
              Save Changes
            </Button>
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
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Are you sure you want to delete this user?
            </Typography>
            <Button onClick={handleCloseDeleteModal}>Back</Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Eliminate
            </Button>
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
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Are you sure you want to delete all users?
            </Typography>
            <Button onClick={handleCloseDeleteAllUsersModal}>Back</Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirmDeleteAllUsers}
            >
              Eliminate
            </Button>
          </Box>
        </Modal>
      </div>
    </Box>
  );
};

export default Users;
