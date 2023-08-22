import React, { useState } from "react";

import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

export default function Title() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            Adminater
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Menu
              id="menu-app-bar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "center",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "center",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
            >
              <MenuItem>
                <Link href="/" underline="none">
                  home
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="/setting" underline="none">
                  about
                </Link>
              </MenuItem>
            </Menu>
            <IconButton sx={rightLink} color="inherit" onMouseOver={handleMenu}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
