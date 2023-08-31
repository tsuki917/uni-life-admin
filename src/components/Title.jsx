import React, { useEffect, useState } from "react";

import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import Home from "./Home";
import { auth } from "../libs/fire";
import { Assignment, LocalLibrary } from "@mui/icons-material";
const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

export default function Title({ loginButton }) {
  const navigation = useNavigate();
  const [toggleView, setToggleView] = useState("");

  useEffect(() => {}, []);
  const handleToggleChange = (e, newView) => {
    setToggleView(newView);
  };
  return (
    <div>
      <AppBar position="fixed" sx={{ ml: 1, mr: 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Button
            variant="h6"
            underline="none"
            color="inherit"
            sx={{ fontSize: 24 }}
            LinkComponent={Link}
            to=""
            // onClick={(e) => {
            //   pageChange(e);
            // }}
          >
            GPAJourney
          </Button>
          <ToggleButtonGroup
            exclusive
            color="primary"
            value={toggleView}
            onChange={handleToggleChange}
            sx={{
              "& .MuiToggleButton-root.Mui-selected": {
                backgroundColor: "#d9d9db", // 選択されているアイテムの背景色を指定
                color: "black", // 選択されているアイテムのテキスト色を指定
              },
            }}
          >
            <ToggleButton
              value="subject"
              aria-label="subject"
              LinkComponent={Link}
              to="/subjects"
              sx={{
                bgcolor: "background.paper",
                "&:hover": {
                  bgcolor: "#d9d9db", // ホバー時の背景色も指定（必要に応じて）
                },
                ml: 4,
                fontSize: 12,
              }}
            >
              <LocalLibrary />
              subject
            </ToggleButton>
            <ToggleButton
              value="tasks"
              aria-label="tasks"
              LinkComponent={Link}
              to="/tasks"
              sx={{
                bgcolor: "background.paper",
                "&:hover": {
                  bgcolor: "#d9d9db", // ホバー時の背景色も指定（必要に応じて）
                },
                ml: 4,
                fontSize: 12,
              }}
            >
              <Assignment />
              　task　
            </ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {auth.currentUser ? (
              <Box sx={{ pt: 1, pb: 1 }}>{auth.currentUser.email}</Box>
            ) : (
              loginButton
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
