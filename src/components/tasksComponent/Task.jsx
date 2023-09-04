import React from "react";
import { ListItem, ListItemText, Typography, Link, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link as LinkRouter } from "react-router-dom";
export default function Task({ eventsData }) {
  const toSubject = "/subjects/" + eventsData.subjectName;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box>
      {isMobile ? (
        <ListItem sx={{ bgcolor: "#eeeef0", mb: 1, width: 1, height: "100px" }}>
          {eventsData.reportData !== undefined && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                width: 1,
                color: "#1976d2",
              }}
            >
              <Box sx={{ width: "50%" }}>
                <Link to={toSubject} underline="none" component={LinkRouter}>
                  <ListItemText
                    primary={eventsData.reportData.title}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline", ml: 2 }}
                          component="span"
                          variant="body2"
                          color="#1976d2"
                        >
                          {eventsData.subjectName + "-課題"}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </Link>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  width: "50%",
                  p: 0,
                  m: 0,
                }}
              >
                <span>
                  {"期限日 : " +
                    ("seconds" in eventsData.reportData.deadlineDay
                      ? eventsData.reportData.deadlineDay
                          .toDate()
                          .toLocaleDateString()
                      : new Date(
                          eventsData.reportData.deadlineDay
                        ).toLocaleDateString())}
                </span>
                <span>
                  状態 :
                  {eventsData.reportData.isFinished ? (
                    <span style={{ color: "green" }}> 完了済</span>
                  ) : (
                    <span style={{ color: "red" }}> 未完了</span>
                  )}
                </span>

                <span>
                  点数:
                  {eventsData.reportData.isFinished
                    ? eventsData.reportData.score
                    : "未登録"}
                </span>
              </Box>
            </Box>
          )}
          {eventsData.smallExamData !== undefined && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                width: 1,
                color: "#1976d2",
              }}
            >
              <Box sx={{ width: "50%" }}>
                <Link to={toSubject} underline="none" component={LinkRouter}>
                  <ListItemText
                    primary={eventsData.smallExamData.title}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline", ml: 2 }}
                          component="span"
                          variant="body2"
                          color="#1976d2"
                        >
                          {eventsData.subjectName + "-小テスト"}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </Link>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  width: "50%",
                  p: 0,
                  m: 0,
                }}
              >
                <span>
                  {"実施日 : " +
                    ("seconds" in eventsData.smallExamData.Xday
                      ? eventsData.smallExamData.Xday.toDate().toLocaleDateString()
                      : new Date(
                          eventsData.smallExamData.Xday
                        ).toLocaleDateString())}
                </span>
                <span>
                  状態 :
                  {eventsData.smallExamData.isFinished ? (
                    <span style={{ color: "green" }}> 実施済</span>
                  ) : (
                    <span style={{ color: "red" }}> 未実施</span>
                  )}
                </span>

                <span>
                  点数:
                  {eventsData.smallExamData.isFinished
                    ? eventsData.smallExamData.score
                    : "未登録"}
                </span>
              </Box>
            </Box>
          )}
          {eventsData.middleExamData !== undefined && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                width: 1,
                color: "#1976d2",
              }}
            >
              <Box sx={{ width: "50%" }}>
                <Link to={toSubject} underline="none" component={LinkRouter}>
                  <ListItemText
                    primary={"中間試験"}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline", ml: 2 }}
                          component="span"
                          variant="body2"
                          color="#1976d2"
                        >
                          {eventsData.subjectName}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </Link>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  width: "50%",
                  p: 0,
                  m: 0,
                }}
              >
                <span>
                  {"実施日 : " +
                    ("seconds" in eventsData.middleExamData.Xday
                      ? eventsData.middleExamData.Xday.toDate().toLocaleDateString()
                      : new Date(
                          eventsData.middleExamData.Xday
                        ).toLocaleDateString())}
                </span>
                <span>
                  状態 :
                  {eventsData.middleExamData.isFinished ? (
                    <span style={{ color: "green" }}> 実施済</span>
                  ) : (
                    <span style={{ color: "red" }}> 未実施</span>
                  )}
                </span>

                <span>
                  点数:
                  {eventsData.middleExamData.isFinished
                    ? eventsData.middleExamData.score
                    : "未登録"}
                </span>
              </Box>
            </Box>
          )}
          {eventsData.finalExamData !== undefined && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                width: 1,
                color: "#1976d2",
              }}
            >
              <Box sx={{ width: "50%" }}>
                <Link to={toSubject} underline="none" component={LinkRouter}>
                  <ListItemText
                    primary={"期末試験"}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline", ml: 2 }}
                          component="span"
                          variant="body2"
                          color="#1976d2"
                        >
                          {eventsData.subjectName}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </Link>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  width: "50%",
                  p: 0,
                  m: 0,
                }}
              >
                <span>
                  {"実施日 : " +
                    ("seconds" in eventsData.finalExamData.Xday
                      ? eventsData.finalExamData.Xday.toDate().toLocaleDateString()
                      : new Date(
                          eventsData.finalExamData.Xday
                        ).toLocaleDateString())}
                </span>
                <span>
                  状態 :
                  {eventsData.finalExamData.isFinished ? (
                    <span style={{ color: "green" }}> 実施済</span>
                  ) : (
                    <span style={{ color: "red" }}> 未実施</span>
                  )}
                </span>

                <span>
                  点数:
                  {eventsData.finalExamData.isFinished
                    ? eventsData.finalExamData.score
                    : "未登録"}
                </span>
              </Box>
            </Box>
          )}
        </ListItem>
      ) : (
        <ListItem sx={{ bgcolor: "#eeeef0", mb: 1, width: 1 }}>
          {eventsData.reportData !== undefined && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                width: 1,
                color: "#1976d2",
              }}
            >
              <Box sx={{ width: "60%" }}>
                <Link to={toSubject} underline="none" component={LinkRouter}>
                  <ListItemText
                    primary={eventsData.reportData.title}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline", ml: 2 }}
                          component="span"
                          variant="body2"
                          color="#1976d2"
                        >
                          {eventsData.subjectName + "-課題"}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </Link>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  p: 0,
                  m: 0,
                }}
              >
                <span>
                  {"期限日 : " +
                    ("seconds" in eventsData.reportData.deadlineDay
                      ? eventsData.reportData.deadlineDay
                          .toDate()
                          .toLocaleDateString()
                      : new Date(
                          eventsData.reportData.deadlineDay
                        ).toLocaleDateString())}
                </span>
                <span>
                  状態 :
                  {eventsData.reportData.isFinished ? (
                    <span style={{ color: "green" }}> 完了済</span>
                  ) : (
                    <span style={{ color: "red" }}> 未完了</span>
                  )}
                </span>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  p: 0,
                  m: 0,
                }}
              >
                <span>
                  点数:
                  {eventsData.reportData.isFinished
                    ? eventsData.reportData.score
                    : "未登録"}
                </span>
              </Box>
            </Box>
          )}
          {eventsData.smallExamData !== undefined && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                width: 1,
                color: "#1976d2",
              }}
            >
              <Box sx={{ width: "60%" }}>
                <Link to={toSubject} underline="none" component={LinkRouter}>
                  <ListItemText
                    primary={eventsData.smallExamData.title}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline", ml: 2 }}
                          component="span"
                          variant="body2"
                          color="#1976d2"
                        >
                          {eventsData.subjectName + "-小テスト"}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </Link>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  p: 0,
                  m: 0,
                }}
              >
                <span>
                  {"実施日 : " +
                    ("seconds" in eventsData.smallExamData.Xday
                      ? eventsData.smallExamData.Xday.toDate().toLocaleDateString()
                      : new Date(
                          eventsData.smallExamData.Xday
                        ).toLocaleDateString())}
                </span>
                <span>
                  状態 :
                  {eventsData.smallExamData.isFinished ? (
                    <span style={{ color: "green" }}> 実施済</span>
                  ) : (
                    <span style={{ color: "red" }}> 未実施</span>
                  )}
                </span>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  p: 0,
                  m: 0,
                }}
              >
                <span>
                  点数:
                  {eventsData.smallExamData.isFinished
                    ? eventsData.smallExamData.score
                    : "未登録"}
                </span>
              </Box>
            </Box>
          )}
          {eventsData.middleExamData !== undefined && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                width: 1,
                color: "#1976d2",
              }}
            >
              <Box sx={{ width: "60%" }}>
                <Link to={toSubject} underline="none" component={LinkRouter}>
                  <ListItemText
                    primary={"中間試験"}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline", ml: 2 }}
                          component="span"
                          variant="body2"
                          color="#1976d2"
                        >
                          {eventsData.subjectName}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </Link>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  p: 0,
                  m: 0,
                }}
              >
                <span>
                  {"実施日 : " +
                    ("seconds" in eventsData.middleExamData.Xday
                      ? eventsData.middleExamData.Xday.toDate().toLocaleDateString()
                      : new Date(
                          eventsData.middleExamData.Xday
                        ).toLocaleDateString())}
                </span>
                <span>
                  状態 :
                  {eventsData.middleExamData.isFinished ? (
                    <span style={{ color: "green" }}> 実施済</span>
                  ) : (
                    <span style={{ color: "red" }}> 未実施</span>
                  )}
                </span>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  p: 0,
                  m: 0,
                }}
              >
                <span>
                  点数:
                  {eventsData.middleExamData.isFinished
                    ? eventsData.middleExamData.score
                    : "未登録"}
                </span>
              </Box>
            </Box>
          )}
          {eventsData.finalExamData !== undefined && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                width: 1,
                color: "#1976d2",
              }}
            >
              <Box sx={{ width: "60%" }}>
                <Link to={toSubject} underline="none" component={LinkRouter}>
                  <ListItemText
                    primary={"期末試験"}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline", ml: 2 }}
                          component="span"
                          variant="body2"
                          color="#1976d2"
                        >
                          {eventsData.subjectName}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </Link>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  p: 0,
                  m: 0,
                }}
              >
                <span>
                  {"実施日 : " +
                    ("seconds" in eventsData.finalExamData.Xday
                      ? eventsData.finalExamData.Xday.toDate().toLocaleDateString()
                      : new Date(
                          eventsData.finalExamData.Xday
                        ).toLocaleDateString())}
                </span>
                <span>
                  状態 :
                  {eventsData.finalExamData.isFinished ? (
                    <span style={{ color: "green" }}> 実施済</span>
                  ) : (
                    <span style={{ color: "red" }}> 未実施</span>
                  )}
                </span>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  p: 0,
                  m: 0,
                }}
              >
                <span>
                  点数:
                  {eventsData.finalExamData.isFinished
                    ? eventsData.finalExamData.score
                    : "未登録"}
                </span>
              </Box>
            </Box>
          )}
        </ListItem>
      )}
    </Box>
  );
}
