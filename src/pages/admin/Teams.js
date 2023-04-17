import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  Button,
  Modal,
  Typography,
  Select,
  Box,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Teams = () => {
  const [rows, setRows] = useState([]);
  const [rowsWithSelection, setRowsWithSelection] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem("teams")) || []
  );

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteAllModal, setOpenDeleteAllModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState({});
  const [editedTeam, setEditedTeam] = useState({});
  const [selectedName, setSelectedName] = useState(editedTeam.name);
  const [selectedShortName, setSelectedShortName] = useState(
    editedTeam.shortName
  );
  const [selectedLogoUrl, setSelectedLogoUrl] = useState(editedTeam.logo_url);
  const [selectedOrigin, setSelectedOrigin] = useState(editedTeam.origin);
  const [selectedDivision, setSelectedDivision] = useState(editedTeam.division);
  const [selectedFoundation, setSelectedFoundation] = useState(
    editedTeam.foundation
  );

  const [newTeam, setNewTeam] = useState({});
  const [selectedNewName, setSelectedNewName] = useState("");
  const [selectedNewShortName, setSelectedNewShortName] = useState("");
  const [selectedNewLogoUrl, setSelectedNewLogoUrl] = useState("");
  const [selectedNewOrigin, setSelectedNewOrigin] = useState("");
  const [selectedNewDivision, setSelectedNewDivision] = useState("");
  const [selectedNewFoundation, setSelectedNewFoundation] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem("teams", JSON.stringify(selected));
  }, [selected]);

  useEffect(() => {
    async function getTeams() {
      const response = await axios.get("http://localhost:3001/api/teams");
      const teams = response.data.map((team) => ({
        ...team,
        selected: selected.some((sel) => sel._id === team._id),
      }));
      setRows(teams);
      setRowsWithSelection(teams);
    }
    getTeams();
    // const storagedTeam = JSON.parse(localStorage.getItem("selectedTeam"));
    // setEditingTeam(storagedTeam);
  }, []);

  const handleSortRequest = (property) => {
    // Define the sort function here
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.findIndex((sel) => sel._id === row._id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setRowsWithSelection(
      rowsWithSelection.map((r) =>
        r._id === row._id ? { ...r, selected: !r.selected } : r
      )
    );
    setSelected(newSelected);
  };

  const handleSelectAllClick = (event) => {
    let newSelected = [];
    if (event.target.checked) {
      setRowsWithSelection(
        rowsWithSelection.map((row) => ({ ...row, selected: true }))
      );
      newSelected = rowsWithSelection.map((row) => ({
        ...row,
        selected: true,
      }));
    } else {
      setRowsWithSelection(
        rowsWithSelection.map((row) => ({ ...row, selected: false }))
      );
    }
    setSelected(newSelected);
  };

  const filteredRows = rowsWithSelection.filter((row) => {
    return Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const isSelected = (row) => selected.some((sel) => sel._id === row._id);

  //función para abrir el modal de add team
  const handleAddTeam = () => {
    setOpenAddModal(true);
  };

  //función para abrir el modal de delete all teams
  const handleDeleteAllTeams = () => {
    setOpenDeleteAllModal(true);
  };

  //función para abrir el modal de edit team
  const handleEditTeam = (team) => {
    setSelectedName(team.name);
    setSelectedShortName(team.shortName);
    setSelectedLogoUrl(team.logo_url);
    setSelectedOrigin(team.origin);
    setSelectedDivision(team.division);
    setSelectedFoundation(team.foundation);
    // localStorage.setItem("storagedTeam", JSON.stringify(team));
    setEditingTeam(team);
    setEditedTeam(team);
    setOpenEditModal(true);
  };
  //funcion para abrir el modal de delete one team
  const handleDeleteTeam = (team) => {
    setEditingTeam(team);
    setEditedTeam(team);
    setOpenDeleteModal(true);
  };

  //funcion para confirmar el borrado de un equipo

  const handleDelete = async () => {
    const uid = localStorage.getItem("uid");
    const userLogged = await axios.get(
      `http://localhost:3001/api/users/search/${uid}`
    );

    try {
      const response = await axios.delete(
        `http://localhost:3001/api/teams/admin/${editedTeam._id}`,
        {
          uid: uid,
        }
      );
      const updatedTeams = rows.filter((team) => team._id !== editedTeam._id);
      setRows(updatedTeams);
      setRowsWithSelection(updatedTeams);
      setOpenDeleteModal(false);
      alert("team successfully eliminated");
    } catch (error) {
      alert("error al eliminar");
    }
  };

  //funcion para confirmar el borrado de todos los equipos
  const handleConfirmDeleteAllTeams = async () => {
    const uid = localStorage.getItem("uid");
    const userLogged = await axios.get(
      `http://localhost:3001/api/users/search/${uid}`
    );
    try {
      const response = await axios.delete(
        "http://localhost:3001/api/teams/admin",
        {
          uid: uid,
        }
      );
      alert("All teams successfully eliminated");
      setOpenDeleteAllModal(false);
      setRows([]);
      setRowsWithSelection([]);
    } catch (error) {
      alert("error al eliminar equipos");
    }
  };
  //funcion para confirmar agregado de nuevo equipo
  const handleNewTeamSaveChanges = async () => {
    setFormSubmitted(true);

    const uid = localStorage.getItem("uid");
    const userLogged = await axios.get(
      `http://localhost:3001/api/users/search/${uid}`
    );

    if (
      selectedNewName &&
      selectedNewShortName &&
      selectedNewOrigin &&
      selectedNewFoundation &&
      selectedNewLogoUrl &&
      selectedNewDivision
    ) {
      try {
        const response = await axios.post(
          `http://localhost:3001/api/teams/admin`,
          {
            uid: uid,
            team: {
              name: selectedNewName,
              logo_url: selectedNewLogoUrl,
              division: selectedNewDivision,
              foundation: selectedNewFoundation,
              origin: selectedNewOrigin,
              shortName: selectedNewShortName,
            },
          }
        );
        alert("Team succesfully created");

        const updatedTeams = rows.push(response);
        setRows(updatedTeams);
        setRowsWithSelection(updatedTeams);
      } catch (error) {
        alert("Error while creating the team");
      }

      setOpenAddModal(false);
      setFormSubmitted(false);
      setSelectedNewName("");
      setSelectedNewShortName("");
      setSelectedNewOrigin("");
      setSelectedNewFoundation("");
      setSelectedNewLogoUrl("");
      setSelectedNewDivision("");
    }
  };
  console.log("newTeam", newTeam);
  console.log("selected new name", selectedNewName);
  console.log("selected new Short name", selectedNewShortName);
  console.log("selected new origin", selectedNewOrigin);
  console.log("selected new foundation", selectedNewFoundation);
  console.log("selected new logo url", selectedNewLogoUrl);
  console.log("selected new division", selectedNewDivision);

  //funcion para guardar cambios de edición
  const handleSaveChanges = async () => {
    const updatedTeams = rows.map((team) => {
      if (team._id === editingTeam._id) {
        return { ...team, ...editedTeam };
      }
      return team;
    });
    setRows(updatedTeams);
    setRowsWithSelection(updatedTeams);

    const uid = localStorage.getItem("uid");
    const userLogged = await axios.get(
      `http://localhost:3001/api/users/search/${uid}`
    );
    try {
      const response = await axios.put(
        `http://localhost:3001/api/teams/admin/${editingTeam._id}`,
        {
          uid: uid,
          updates: {
            name: editedTeam.name,
            logo_url: editedTeam.logo_url,
            division: editedTeam.division,
            foundation: editedTeam.foundation,
            origin: editedTeam.origin,
            shortName: editedTeam.shortName,
          },
        }
      );
      alert("team succesfully edited");
    } catch (error) {
      alert("error");
    }
    // localStorage.removeItem("storagedTeam");
    setOpenEditModal(false);
    setEditingTeam({});
  };

  //funciones para cerrar modales
  const handleCloseEditModal = () => {
    setOpenEditModal(false);

    // localStorage.removeItem("storagedTeam");
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setFormSubmitted(false);
    setSelectedNewName("");
    setSelectedNewShortName("");
    setSelectedNewOrigin("");
    setSelectedNewFoundation("");
    setSelectedNewLogoUrl("");
    setSelectedNewDivision("");
  };
  const handleCloseDeleteAllModal = () => {
    setOpenDeleteAllModal(false);
  };
  console.log("editing team", editingTeam);
  console.log("editedTeam", editedTeam);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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
          placeholder="Search Team / Country"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddTeam}
            sx={{ height: "100%" }}
          >
            Add new team
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ margin: "20px" }}
            onClick={handleDeleteAllTeams}
          >
            Delete all teams
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
                <TableCell
                  style={{ fontWeight: "bold" }}
                  onClick={() => handleSortRequest("name")}
                >
                  Team
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Logo</TableCell>
                <TableCell
                  style={{ fontWeight: "bold" }}
                  onClick={() => handleSortRequest("shortName")}
                >
                  Short Name
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold" }}
                  onClick={() => handleSortRequest("origin")}
                  sx={{ display: isMobile ? "none" : "static" }}
                >
                  Origin
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold" }}
                  onClick={() => handleSortRequest("division")}
                  sx={{ display: isMobile ? "none" : "static" }}
                >
                  Division
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold" }}
                  onClick={() => handleSortRequest("Foundation")}
                  sx={{ display: isMobile ? "none" : "static" }}
                >
                  Foundation
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => {
                const isItemSelected = isSelected(row);
                return (
                  <TableRow
                    key={row._id}
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    tabIndex={-1}
                    selected={isItemSelected}
                  >
                    <TableCell>
                      <Button
                        variant="contained"
                        color="inherit"
                        startIcon={<EditIcon />}
                        onClick={() => handleEditTeam(row)}
                        sx={{ mr: 1, width: "90px" }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        // sx={{ margin: "20px" }}
                        onClick={() => handleDeleteTeam(row)}
                        sx={{ width: "90px" }}
                      >
                        Delete
                      </Button>
                    </TableCell>

                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <img
                        src={row.logo_url}
                        alt="Team Logo"
                        style={{ width: "45px", height: "45px" }}
                      />
                    </TableCell>
                    <TableCell>{row.shortName}</TableCell>
                    <TableCell sx={{ display: isMobile ? "none" : "static" }}>
                      {row.origin}
                    </TableCell>
                    <TableCell sx={{ display: isMobile ? "none" : "static" }}>
                      {row.division}
                    </TableCell>
                    <TableCell sx={{ display: isMobile ? "none" : "static" }}>
                      {row.foundation}
                    </TableCell>
                  </TableRow>
                );
              })}
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
              Edit team
            </Typography>
            <TextField
              label="Name"
              fullWidth
              sx={{ mb: 2 }}
              value={selectedName}
              onChange={(e) => {
                setSelectedName(e.target.value);
                setEditedTeam((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />
            <TextField
              label="Logo"
              fullWidth
              sx={{ mb: 2 }}
              value={selectedLogoUrl}
              onChange={(e) => {
                setSelectedLogoUrl(e.target.value);
                setEditedTeam((prev) => ({
                  ...prev,
                  logo_url: e.target.value,
                }));
              }}
            />
            <TextField
              label="Short name"
              fullWidth
              sx={{ mb: 2 }}
              value={selectedShortName}
              onChange={(e) => {
                setSelectedShortName(e.target.value);
                setEditedTeam((prev) => ({
                  ...prev,
                  shortName: e.target.value,
                }));
              }}
            />
            <TextField
              label="Origin"
              fullWidth
              sx={{ mb: 2 }}
              value={selectedOrigin}
              onChange={(e) => {
                setSelectedOrigin(e.target.value);
                setEditedTeam((prev) => ({
                  ...prev,
                  origin: e.target.value,
                }));
              }}
            />
            <TextField
              label="Division"
              fullWidth
              sx={{ mb: 2 }}
              value={selectedDivision}
              onChange={(e) => {
                setSelectedDivision(e.target.value);
                setEditedTeam((prev) => ({
                  ...prev,
                  division: e.target.value,
                }));
              }}
            />
            <TextField
              label="foundation"
              fullWidth
              sx={{ mb: 2 }}
              value={selectedFoundation}
              onChange={(e) => {
                setSelectedFoundation(e.target.value);
                setEditedTeam((prev) => ({
                  ...prev,
                  foundation: e.target.value,
                }));
              }}
            />
            <Button sx={{ mr: 2 }} onClick={handleSaveChanges}>
              Save Changes
            </Button>
            <Button onClick={handleCloseEditModal}>Back</Button>
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
              // height: 200,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Are you sure you want to delete this team?
            </Typography>
            <Button onClick={handleDelete}>Eliminate</Button>
            <Button onClick={handleCloseDeleteModal}>Back</Button>
          </Box>
        </Modal>
        <Modal open={openAddModal} onClose={handleCloseAddModal}>
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
              Add new team
            </Typography>
            <TextField
              label="Name"
              fullWidth
              sx={{ mb: 2 }}
              value={selectedNewName}
              onChange={(e) => {
                setSelectedNewName(e.target.value);
                setNewTeam((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
              required
              error={formSubmitted && !selectedNewName}
              helperText={
                formSubmitted && !selectedNewName ? "Name is required" : ""
              }
            />

            <TextField
              label="Logo"
              fullWidth
              sx={{ mb: 2 }}
              value={selectedNewLogoUrl}
              onChange={(e) => {
                setSelectedNewLogoUrl(e.target.value);
                setNewTeam((prev) => ({
                  ...prev,
                  logo_url: e.target.value,
                }));
              }}
              required
              error={formSubmitted && !selectedNewLogoUrl}
              helperText={
                formSubmitted && !selectedNewLogoUrl
                  ? "Logo Url is required"
                  : ""
              }
            />
            <TextField
              label="Division"
              fullWidth
              sx={{ mb: 2 }}
              value={selectedNewDivision}
              onChange={(e) => {
                setSelectedNewDivision(e.target.value);
                setNewTeam((prev) => ({
                  ...prev,
                  division: e.target.value,
                }));
              }}
              required
              error={formSubmitted && !selectedNewDivision}
              helperText={
                formSubmitted && !selectedNewDivision
                  ? "Division is required"
                  : ""
              }
            />
            <TextField
              label="Foundation"
              fullWidth
              sx={{ mb: 2 }}
              value={selectedNewFoundation}
              onChange={(e) => {
                setSelectedNewFoundation(e.target.value);
                setNewTeam((prev) => ({
                  ...prev,
                  foundation: e.target.value,
                }));
              }}
              required
              error={formSubmitted && !selectedNewFoundation}
              helperText={
                formSubmitted && !selectedNewFoundation
                  ? "Division is required"
                  : ""
              }
            />
            <TextField
              label="Origin"
              fullWidth
              sx={{ mb: 2 }}
              value={selectedNewOrigin}
              onChange={(e) => {
                setSelectedNewOrigin(e.target.value);
                setNewTeam((prev) => ({
                  ...prev,
                  origin: e.target.value,
                }));
              }}
              required
              error={formSubmitted && !selectedNewOrigin}
              helperText={
                formSubmitted && !selectedNewOrigin ? "Origin is required" : ""
              }
            />
            <TextField
              label="Short name"
              fullWidth
              sx={{ mb: 2 }}
              value={selectedNewShortName}
              onChange={(e) => {
                setSelectedNewShortName(e.target.value);
                setNewTeam((prev) => ({
                  ...prev,
                  shortName: e.target.value,
                }));
              }}
              required
              error={formSubmitted && !selectedNewShortName}
              helperText={
                formSubmitted && !selectedNewShortName
                  ? "Short Name is required"
                  : ""
              }
            />
            <Button onClick={handleNewTeamSaveChanges} sx={{ mr: 2 }}>
              Save Changes
            </Button>
            <Button onClick={handleCloseAddModal}>Back</Button>
          </Box>
        </Modal>
        <Modal open={openDeleteAllModal} onClose={handleCloseDeleteAllModal}>
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
              // height: 200,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Are you sure you want to delete all the teams?
            </Typography>
            <Button onClick={handleConfirmDeleteAllTeams}>Eliminate</Button>
            <Button onClick={handleCloseDeleteAllModal}>Back</Button>
          </Box>
        </Modal>
      </div>
    </Box>
  );
};
export default Teams;
