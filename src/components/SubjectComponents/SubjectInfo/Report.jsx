import React, { useState } from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { ChangeReport } from "../Form/ChangeReport";
import { ChaRepRate } from "../Form/ChaRepRate";
import { AddReport } from "../Form/AddReport";
import { DeleteReport } from "../Form/DeleteReport";
import { IsFinishReport } from "../Form/IsFinishReport";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Report({
  reportData,
  reportRate,
  name,
  setData,
  setRate,
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      {isSmallScreen ? (
        <Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-start",
              width: 1,
              alignItems: "center",
            }}
          >
            <h3>
              課題 <span>成績配分 : {reportRate}%</span>
            </h3>
            <ChaRepRate data={reportData} name={name} set={setRate} />
          </Box>
          <List>
            {reportData.map((reportArrayData, key) => {
              return (
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    width: 1,
                  }}
                >
                  <ListItem sx={{ bgcolor: "#eeeef0", mb: 1 }} key={key}>
                    <ListItemText
                      primary={reportArrayData.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {"期限 : " +
                              ("seconds" in reportArrayData.deadlineDay
                                ? reportArrayData.deadlineDay
                                    .toDate()
                                    .toLocaleDateString()
                                : new Date(
                                    reportArrayData.deadlineDay
                                  ).toLocaleDateString())}
                          </Typography>
                          {/* content */}
                          {reportArrayData.isFinished ? (
                            <span style={{ display: "block" }}>
                              — 成績{reportArrayData.score}点
                            </span>
                          ) : (
                            <span style={{ display: "block" }}>
                              — 成績 未完了
                            </span>
                          )}
                        </React.Fragment>
                      }
                    />
                    <IsFinishReport
                      rate={reportRate}
                      data={reportData}
                      index={key}
                      name={name}
                      set={setData}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        // width: 1,
                      }}
                    >
                      <ChangeReport
                        rate={reportRate}
                        data={reportData}
                        index={key}
                        name={name}
                        set={setData}
                      />
                      <DeleteReport
                        rate={reportRate}
                        data={reportData}
                        index={key}
                        name={name}
                        set={setData}
                      />
                    </Box>
                  </ListItem>
                </Box>
              );
            })}

            <AddReport
              rate={reportRate}
              data={reportData}
              name={name}
              set={setData}
            />
          </List>
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-start",
              width: 1,
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <h2>
              課題 <span>成績配分 : {reportRate}%</span>
            </h2>
            <ChaRepRate data={reportData} name={name} set={setRate} />
          </Box>
          <List>
            {reportData.map((reportArrayData, key) => {
              return (
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    width: 1,
                  }}
                >
                  <ListItem sx={{ bgcolor: "#eeeef0", mb: 1 }} key={key}>
                    <ListItemText
                      primary={reportArrayData.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {"期限 : " +
                              ("seconds" in reportArrayData.deadlineDay
                                ? reportArrayData.deadlineDay
                                    .toDate()
                                    .toLocaleDateString()
                                : new Date(
                                    reportArrayData.deadlineDay
                                  ).toLocaleDateString())}
                          </Typography>
                          {/* content */}
                          {reportArrayData.isFinished
                            ? " — 成績" + reportArrayData.score + "点"
                            : " — 成績 未完了"}
                        </React.Fragment>
                      }
                    />
                    <IsFinishReport
                      rate={reportRate}
                      data={reportData}
                      index={key}
                      name={name}
                      set={setData}
                    />
                    <ChangeReport
                      rate={reportRate}
                      data={reportData}
                      index={key}
                      name={name}
                      set={setData}
                    />
                    <DeleteReport
                      rate={reportRate}
                      data={reportData}
                      index={key}
                      name={name}
                      set={setData}
                    />
                  </ListItem>
                </Box>
              );
            })}

            <AddReport
              rate={reportRate}
              data={reportData}
              name={name}
              set={setData}
            />
          </List>
        </Box>
      )}
    </div>
  );
}
