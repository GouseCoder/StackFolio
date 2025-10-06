import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <AppBar position="fixed" elevation={2} sx={{ bgcolor: "white", color: "text.primary", borderBottom: "1px solid #e5e7eb", boxShadow: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">My Personal Portfolio</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button color="inherit" component={Link} to="/" sx={{ textTransform: "none", mx: 1, fontWeight: 500 }}>Home</Button>
          <Button color="inherit" component={Link} to="/about" sx={{ textTransform: "none", mx: 1, fontWeight: 500 }}>About</Button>
          <Button color="inherit" component={Link} to="/projects" sx={{ textTransform: "none", mx: 1, fontWeight: 500 }}>Projects</Button>
          <Button color="inherit" component={Link} to="/blog" sx={{ textTransform: "none", mx: 1, fontWeight: 500 }}>Blog</Button>

          {user ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }} color="inherit">
                <Avatar>{user?.sub ? user.sub.split(" ").map(n => n[0]).join("").toUpperCase() : "U"}</Avatar>
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem disabled>{user?.sub || "User"}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login" sx={{ textTransform: "none", mx: 1, fontWeight: 500 }}>Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}