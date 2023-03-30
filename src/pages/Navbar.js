import * as React from "react";
import { useEffect } from "react";
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
import { FormattedMessage } from "react-intl";
import { auth } from "../../utils/firebaseConfig";
import { logOut } from "../../utils/functions";
import { useSelector, useDispatch } from "react-redux";
import { setUid } from "../../redux/reducers/uid";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
}));

const Navbar = () => {
  const uid = useSelector((state) => state.uid);
  const dispatch = useDispatch()
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);

  };

  const handleLogOut = () => {
    dispatch(setUid(""));
    logOut(auth);
  };

  useEffect(() => { }, [uid]);

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
              {uid ? (<MenuItem onClick={handleClose}>
                <FormattedMessage id="perfil" />
              </MenuItem>) : ("")}
              {uid ? (<MenuItem onClick={handleClose}>
                <FormattedMessage id="config" />
              </MenuItem>) : ("")}
              {uid ? (
                <MenuItem onClick={() =>{
                  handleClose()
                  handleLogOut()}} >
                  <FormattedMessage id="logout" />
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
          <MenuItem onClick={() => setDrawerOpen(false)}>
            <FormattedMessage id="predictions" />
          </MenuItem>
          <MenuItem onClick={() => setDrawerOpen(false)}>
            <FormattedMessage id="ranking" />
          </MenuItem>
          <MenuItem onClick={() => setDrawerOpen(false)}>
            <FormattedMessage id="fixture" />
          </MenuItem>
          <MenuItem onClick={() => setDrawerOpen(false)}>
            <FormattedMessage id="torneos" />
          </MenuItem>
          <MenuItem onClick={() => setDrawerOpen(false)}>
            <FormattedMessage id="panel" />
          </MenuItem>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
