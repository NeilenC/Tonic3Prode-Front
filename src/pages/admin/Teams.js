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
} from "@mui/material";

const Teams = () => {
  const [rows, setRows] = useState([]);
  const [rowsWithSelection, setRowsWithSelection] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem("teams")) || []
  );

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

  return (
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSortRequest("name")}>
                Team
              </TableCell>
              <TableCell>Logo</TableCell>
              <TableCell onClick={() => handleSortRequest("shortName")}>
                Short Name
              </TableCell>
              <TableCell
                onClick={() => handleSortRequest("origin")}
                sx={{ display: isMobile ? "none" : "static" }}
              >
                Origin
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default Teams;
