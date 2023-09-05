import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link as RouterLink } from "react-router-dom";

import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Button,
  Tabs,
  Link,
  Tab,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
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

export default function Title({ login }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigation = useNavigate();
  const [toggleView, setToggleView] = useState("");
  const [slideView, setSlideView] = useState(0);
  const handleToggleChange = (e, newView) => {
    setToggleView(newView);
  };
  const handleSlideChange = (e, newSlide) => {
    console.log(newSlide);
    setSlideView(newSlide);
  };

  const loginDeal = () => {
    login();
    navigation("../subjects");
  };

  return (
    <Box>
      {isMobile ? (
        <Box>
          <AppBar position="fixed" sx={{ ml: 1, p: 0 }}>
            <Toolbar
              sx={{
                justifyContent: "space-between",
                flexDirection: "column",
                ml: 0,
                mr: 1,
                height: "110px",
                width: 1,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  mr: 1,
                  pr: 1,
                }}
              >
                <Button
                  variant="h6"
                  underline="none"
                  color="inherit"
                  sx={{ fontSize: 24 }}
                  LinkComponent={Link}
                  to="/"
                  // onClick={(e) => {
                  //   pageChange(e);
                  // }}
                >
                  GPA　Journey
                </Button>
                {auth.currentUser ? (
                  <Box
                    sx={{
                      pt: 1,
                      pb: 1,
                      flex: 1,
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      borderRadius: "3",
                      width: 1,
                    }}
                  >
                    <Button onClick={login}>
                      <img
                        src={auth.currentUser.photoURL}
                        alt="アイコン"
                        style={{ marginLeft: 10, borderRadius: 30 }}
                        width="30"
                        height="30"
                      ></img>
                    </Button>
                  </Box>
                ) : (
                  <Button
                    onClick={loginDeal}
                    variant="outlined"
                    sx={{
                      color: "white",
                      p: 1,
                      m: 0,
                      borderColor: "white",
                      marginTop: "4px",
                      marginRight: "12px",
                    }}
                  >
                    ログイン
                  </Button>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: 1,
                  mr: 4,
                  p: 0,
                }}
              >
                {auth.currentUser !== null ? (
                  <Box
                    sx={{
                      maxWidth: "100%",
                      width: "100%",
                      bgcolor: "background.paper",
                      display: "flex",
                      justifyContent: "center",
                      justifyItems: "center",

                      p: 0,
                    }}
                  >
                    <Tabs
                      value={slideView}
                      onChange={handleSlideChange}
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                      sx={{ width: 1, mr: 0, p: 0 }}
                    >
                      <Tab
                        label="Home"
                        LinkComponent={RouterLink}
                        to="/"
                        sx={{ width: "33%" }}
                      />
                      <Tab
                        label="Subjects"
                        LinkComponent={RouterLink}
                        to="subjects"
                        sx={{ width: "33%" }}
                      />
                      <Tab
                        label="Tasks"
                        LinkComponent={RouterLink}
                        to="tasks"
                        sx={{ width: "33%" }}
                      />
                    </Tabs>
                  </Box>
                ) : (
                  ""
                )}

                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                  }}
                ></Box>
              </Box>
            </Toolbar>
          </AppBar>
          <Toolbar sx={{ height: "150px" }} />
        </Box>
      ) : (
        <Box>
          <AppBar position="fixed" sx={{ ml: 1, mr: 1 }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Button
                variant="h6"
                underline="none"
                color="inherit"
                sx={{ fontSize: 24 }}
                LinkComponent={RouterLink}
                to="/"
                // onClick={(e) => {
                //   pageChange(e);
                // }}
              >
                GPAJourney
              </Button>
              {auth.currentUser !== null ? (
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
                    LinkComponent={RouterLink}
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
                    LinkComponent={RouterLink}
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
              ) : (
                ""
              )}

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                {auth.currentUser ? (
                  <Box
                    sx={{
                      pt: 1,
                      pb: 1,
                      flex: 1,
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      borderRadius: "3",
                      width: 1,
                    }}
                  >
                    {auth.currentUser.email}
                    <Button onClick={login}>
                      <img
                        src={auth.currentUser.photoURL}
                        alt="アイコン"
                        style={{ marginLeft: 10, borderRadius: 30 }}
                        width="30"
                        height="30"
                      ></img>
                    </Button>
                  </Box>
                ) : (
                  <Button
                    onClick={loginDeal}
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    ログイン
                  </Button>
                )}
              </Box>
            </Toolbar>
          </AppBar>
          <Toolbar />
        </Box>
      )}
    </Box>
  );
}
