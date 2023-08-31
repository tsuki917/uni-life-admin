import React from "react";
import { ListItem, ListItemText, Typography, Link, Box } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";
export default function Task({ reportsData }) {
  const toSubject = "/subjects/" + reportsData.subjectName;
  return (
    <ListItem sx={{ bgcolor: "#eeeef0", mb: 1, width: 1 }}>
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
              primary={reportsData.reportData.title}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline", ml: 2 }}
                    component="span"
                    variant="body2"
                    color="#1976d2"
                  >
                    ({reportsData.subjectName})
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
            {"期限 : " +
              ("seconds" in reportsData.reportData.deadlineDay
                ? reportsData.reportData.deadlineDay
                    .toDate()
                    .toLocaleDateString()
                : new Date(
                    reportsData.reportData.deadlineDay
                  ).toLocaleDateString())}
          </span>
          <span>
            状態 :
            {reportsData.reportData.isFinished ? (
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
            {reportsData.reportData.isFinished
              ? reportsData.reportData.score
              : "未登録"}
          </span>
        </Box>
      </Box>
    </ListItem>
  );
}
