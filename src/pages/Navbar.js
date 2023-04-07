import * as React from "react";
import { useEffect, useState } from "react";
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
//import { FormattedMessage } from "react-intl";
import { auth } from "../../utils/firebaseConfig";
import { logOut } from "../../utils/functions";
import { useSelector, useDispatch } from "react-redux";
import { setUid } from "../../redux/reducers/uid";
import Link from "next/link";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
}));

const Navbar = () => {
  const [user, setUser] = useState("");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setUser(localStorage.getItem("uid"));
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem("uid");
    setUser("");
    window.location.href = "http://localhost:3000/";
    logOut(auth);
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
              {user ? <MenuItem onClick={handleClose}>Perfil</MenuItem> : ""}
              {user ? (
                <Link href="/user/profile">
                <MenuItem onClick={handleClose}>Configuración</MenuItem>
                </Link>
              ) : (
                ""
              )}
              {user ? (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleLogOut();
                  }}
                >
                  Logout
                </MenuItem>
              ) : (
                ""
              )}
            </Menu>
          </div>
        </StyledToolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div style={{ width: "250px" }}>
          <MenuItem
            onClick={() => {
              setDrawerOpen(false);
              window.location.href = "http://localhost:3000/home";
            }}
          >
            Tournaments
          </MenuItem>
          <MenuItem
            onClick={() => {
              setDrawerOpen(false);
              window.location.href = "http://localhost:3000/admin";
            }}
          >
            Admin Panel
          </MenuItem>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
