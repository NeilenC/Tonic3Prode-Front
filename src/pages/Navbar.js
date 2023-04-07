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
import axios from "axios";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
}));

const Navbar = () => {
  const [user, setUser] = useState("");
  const [uid, setUid] = useState("");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
  }, []);

  useEffect(() => {
    uid
      ? axios
          .get(`http://localhost:3001/api/users/search/${uid}`)
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
      : null;
  }, [uid]);

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
            {user && <MenuIcon />}
          </IconButton>
          <Button color="inherit">GAMBET</Button>
          <div>
            {user && (
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
            )}

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
              {user && (
                <Link href="/user/profilePage">
                  <MenuItem onClick={handleClose}>Perfil</MenuItem>
                </Link>
              )}
              {user && (
                <Link href="/user/editProfile">
                  <MenuItem onClick={handleClose}>Configuración</MenuItem>
                </Link>
              )}
              {user && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleLogOut();
                  }}
                >
                  Logout
                </MenuItem>
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
          <Link href="/home">
            <MenuItem onClick={() => setDrawerOpen(false)}>
              Tournaments
            </MenuItem>
          </Link>

          {user.rol === "admin" && (
            <Link href="/admin">
              <MenuItem onClick={() => setDrawerOpen(false)}>
                Admin Panel
              </MenuItem>
            </Link>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
