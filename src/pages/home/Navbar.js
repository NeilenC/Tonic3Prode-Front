import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
}));

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <AppBar position="static">
      <StyledToolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Button color="inherit">GAMBET</Button>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
          >
            <Avatar alt="User avatar" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Perfil</MenuItem>
            <MenuItem onClick={handleClose}>Configuración</MenuItem>
            <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
          </Menu>
        </div>
      </StyledToolbar>
    </AppBar>
    <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
    <div style={{ width: '250px' }}>
      <MenuItem onClick={() => setDrawerOpen(false)}>Mis predicciones</MenuItem>
      <MenuItem onClick={() => setDrawerOpen(false)}>Ranking de puntos</MenuItem>
      <MenuItem onClick={() => setDrawerOpen(false)}>Fixtures</MenuItem>
      <MenuItem onClick={() => setDrawerOpen(false)}>Torneos</MenuItem>
      <MenuItem onClick={() => setDrawerOpen(false)}>Panel Administrador</MenuItem>
    </div>
  </Drawer>
  </>
  );
};

export default Navbar;
