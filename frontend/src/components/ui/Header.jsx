// import { AppBar, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  MenuItem,
  Menu,
} from "@mui/material";
import { AccountCircle, LunchDining } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../features/users/usersApiSlice";
import { clearCredentials } from "../../app/api/authSlice.js";
// Header adapted from MUI Example
const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      setAnchorElUser(null);
      const response = await logout().unwrap(); // server logout
      console.log(response);
      dispatch(clearCredentials()); // handle auth slice (local storage)
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppBar component="header" position="static">
      <Toolbar component="nav" disableGutters>
        <IconButton component={Link} to="/" sx={{ p: 0 }} color="inherit">
          <LunchDining
            fontSize="large"
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 2,
              ml: 2,
            }}
          />
        </IconButton>
        <Typography
          variant="h4"
          noWrap
          href="/"
          component="h4"
          sx={{
            mr: 2,
            flexGrow: userInfo ? 0 : 1,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 300,
            color: "inherit",
            textDecoration: "none",
          }}>
          Feed Me
        </Typography>
        {userInfo && (
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon fontSize="large" />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}>
              <MenuItem
                component={Link}
                to="/feeds"
                onClick={handleCloseNavMenu}>
                <Typography textAlign="center">My Feeds</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/categories"
                onClick={handleCloseNavMenu}>
                <Typography textAlign="center">My Categories</Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
        <IconButton color="inherit" component={Link} sx={{ p: 0 }} to="/">
          <LunchDining
            fontSize="large"
            sx={{ display: { xs: "flex", md: "none" }, mr: 2, ml: 2 }}
          />
        </IconButton>
        <Typography
          variant="h4"
          noWrap
          href="/"
          component="h4"
          sx={{
            flexGrow: 1,
            mr: 2,
            display: { xs: "flex", md: "none" },
            fontFamily: "monospace",
            fontWeight: 300,
            color: "inherit",
            textDecoration: "none",
          }}>
          Feed Me
        </Typography>
        {userInfo && (
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              component={Link}
              to="/feeds"
              sx={{
                color: "white",
                borderRadius: 5,
                display: "block",
              }}
              onClick={handleCloseNavMenu}>
              My Feeds
            </Button>{" "}
            <Button
              component={Link}
              to="/categories"
              sx={{
                color: "white",
                borderRadius: 5,
                display: "block",
              }}
              onClick={handleCloseNavMenu}>
              My Categories
            </Button>
          </Box>
        )}

        <Box sx={{ flexGrow: 0, mr: 2 }}>
          <IconButton
            size="large"
            onClick={handleOpenUserMenu}
            sx={{ p: 1, color: "inherit" }}>
            <AccountCircle fontSize="large" sx={{}} />
          </IconButton>
          <Menu
            sx={{ mt: 5 }}
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}>
            {userInfo
              ? [
                  <MenuItem
                    key={"profile"}
                    component={Link}
                    to="/profile"
                    color="inherit"
                    onClick={handleCloseUserMenu}>
                    <Typography>Profile</Typography>
                  </MenuItem>,
                  <MenuItem
                    key={"logout"}
                    color="inherit"
                    onClick={handleLogout}>
                    <Typography>Logout</Typography>
                  </MenuItem>,
                ]
              : [
                  <MenuItem
                    key={"register"}
                    component={Link}
                    to="/register"
                    color="inherit"
                    onClick={handleCloseUserMenu}>
                    <Typography>Sign Up</Typography>
                  </MenuItem>,
                  <MenuItem
                    key={"login"}
                    component={Link}
                    to="/login"
                    color="inherit"
                    onClick={handleCloseUserMenu}>
                    <Typography>Login</Typography>
                  </MenuItem>,
                ]}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
