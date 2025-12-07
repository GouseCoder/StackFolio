import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={2}
        sx={{
          bgcolor: "white",
          color: "text.primary",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            fontWeight="bold"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Stack Folio
          </Typography>

          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  textTransform: "none",
                  mx: 1,
                  fontWeight: 500,
                  color: "black",
                }}
              >
                {item.label}
              </Button>
            ))}

            {user ? (
              <>
                <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }} color="inherit">
                  <Avatar>
                    {user?.sub
                      ? user.sub
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "U"}
                  </Avatar>
                </IconButton>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem disabled>{user?.sub || "User"}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    textTransform: "none",
                    mx: 1,
                    fontWeight: 500,
                    backgroundColor: "green",
                    color: "white",
                    "&:hover": { backgroundColor: "darkgreen" },
                  }}
                >
                  Login
                </Button>
              </Link>
            )}
          </Box>

          {/* Mobile Hamburger Icon */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Menu
            </Typography>

            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={toggleDrawer}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}

            {/* Mobile Login / User Section */}
            {user ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton disabled>
                    <ListItemText primary={`Logged in as ${user.sub}`} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={() => { handleLogout(); toggleDrawer(); }}>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/login"
                  onClick={toggleDrawer}
                >
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
