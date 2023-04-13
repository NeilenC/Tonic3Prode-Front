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
import { useIntl } from "react-intl";
import { auth } from "../../utils/firebaseConfig";
import { logOut } from "../../utils/functions";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
}));

const Navbar = () => {
  const router = useRouter();
  const intl = useIntl()

  const [user, setUser] = useState("");
  const [uid, setUid] = useState("");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const userInfo = useSelector((state) => state.userInfo);
  const [username, setUserName] = useState("");

  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.username);
    }
  }, [userInfo]);

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
          <Button  sx={{ color:"inherit", justifyContent:"center"}}>GAMBET</Button>
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
                {/* <Typography variant="subtitle1">
                  <div> {username} &nbsp;&nbsp;&nbsp; </div>
                </Typography> */}
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
                <MenuItem
                  onClick={() => {
                    handleClose;
                    router.push("/user/profilePage");
                  }}
                >

                 {intl.formatMessage({ id: "profile" })}
                </MenuItem>
              )}
              

              {user && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleLogOut();
                    router.push("/");
                  }}
                >
                   {intl.formatMessage({ id: "logout" })}
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
          <MenuItem
            onClick={() => {
              setDrawerOpen(false);
              router.push(`/home`);
            }}
          >
            {intl.formatMessage({ id: "torneo" })}
          </MenuItem>

          {user.rol === "admin" && (
            <MenuItem
              onClick={() => {
                setDrawerOpen(false);
                router.push(`/admin`);
              }}
            >
              {intl.formatMessage({ id: "panel" })}
            </MenuItem>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
