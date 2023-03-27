import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import rows from "../../../fakeData/teams";

function Teams() {
  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem("selected")) || []
  );
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nombre");
  const [searchValue, setSearchValue] = useState("");
  const [rowsWithSelection, setRowsWithSelection] = useState(
    rows.map((row) => ({
      ...row,
      selected: selected.some((sel) => sel.id === row.id),
    }))
  );

  useEffect(() => {
    localStorage.setItem("selected", JSON.stringify(selected));
  }, [selected]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(rows);
      setRowsWithSelection(rowsWithSelection.map((row) => ({ ...row, selected: true })));
    } else {
      setSelected([]);
      setRowsWithSelection(rowsWithSelection.map((row) => ({ ...row, selected: false })));
    }
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.findIndex(sel => sel.id === row.id);
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
  
    setSelected(newSelected);
    setRowsWithSelection(
      rowsWithSelection.map((r) =>
        r.id === row.id ? { ...r, selected: !r.selected } : r
      )
    );
  };

  const isSelected = (row) => selected.some((sel) => sel.id === row.id);

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = rowsWithSelection
    .filter(
      (row) =>
        row.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.division.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.origen.toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort((a, b) => {
      const isAsc = order === "asc";
      if (a[orderBy] < b[orderBy]) {
        return isAsc ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });

  return (
    <div style={{ width: "100%", margin: "0 auto"}}>
      <p  style={{ textAlign: "center" }}> Seleccionados: {selected.length}</p>
      <input
        type="text"
        placeholder="Buscar equipo / pais"
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
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < rowsWithSelection.length
                  }
                  checked={selected.length === rowsWithSelection.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell
                sortDirection={orderBy === "nombre" ? order : false}
                onClick={() => handleSortRequest("nombre")}
              >
                Nombre
              </TableCell>
              <TableCell
                sortDirection={orderBy === "division" ? order : false}
                onClick={() => handleSortRequest("division")}
              >
                División
              </TableCell>
              <TableCell
                sortDirection={orderBy === "origen" ? order : false}
                onClick={() => handleSortRequest("origen")}
              >
                Origen
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => {
              const isItemSelected = isSelected(row);
              return (
                <TableRow
                  key={row.nombre}
                  hover
                  onClick={(event) => handleClick(event, row)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.division}</TableCell>
                  <TableCell>{row.origen}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Teams;
