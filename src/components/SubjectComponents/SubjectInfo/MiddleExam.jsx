import React, { useState } from "react";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { ChangeMiddle } from "../Form/ChangeMiddle";
import { ChaMidRate } from "../Form/ChaMidRate";
import IsFinishMiddle from "../Form/IsFinishMiddle";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
export default function MiddleExam({ middleExamData, name, set }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      {isSmallScreen ? (
        middleExamData === null ? (
          <div>loading</div>
        ) : (
          <Box>
            <Box
              sx={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-start",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <h3>
                中間試験 <span>成績配分 : {middleExamData.rate}%</span>
              </h3>
              <ChaMidRate data={middleExamData} name={name} set={set} />
            </Box>
            <List>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  width: 1,
                }}
              >
                <ListItem sx={{ bgcolor: "#eeeef0", mb: 1 }}>
                  <ListItemText
                    primary={"中間試験"}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {"実施日 : " +
                            (middleExamData.Xday === "未入力"
                              ? "未入力"
                              : "seconds" in middleExamData.Xday
                              ? middleExamData.Xday.toDate().toLocaleDateString()
                              : new Date(
                                  middleExamData.Xday
                                ).toLocaleDateString())}
                        </Typography>
                        {(() => {
                          if (middleExamData.Xday === "未入力") {
                            return (
                              <span style={{ display: "block" }}>— 未入力</span>
                            );
                          } else if (middleExamData.isFinished) {
                            return (
                              <span style={{ display: "block" }}>
                                — 成績{middleExamData.score}点
                              </span>
                            );
                          } else if (!middleExamData.isFinished) {
                            return (
                              <span style={{ display: "block" }}>
                                — 成績 未実施
                              </span>
                            );
                          }
                        })()}
                        <div
                          style={{
                            whiteSpace: "pre-wrap",
                            overflowWrap: "break-word",
                          }}
                        >
                          {middleExamData.title}
                        </div>
                      </React.Fragment>
                    }
                  />
                  <IsFinishMiddle data={middleExamData} name={name} set={set} />
                  <ChangeMiddle data={middleExamData} name={name} set={set} />
                </ListItem>
              </Box>
            </List>
          </Box>
        )
      ) : middleExamData === null ? (
        <div>loading</div>
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "flex-start",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h2>
              中間試験 <span>成績配分 : {middleExamData.rate}%</span>
            </h2>
            <ChaMidRate data={middleExamData} name={name} set={set} />
          </Box>
          <List>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                width: 1,
              }}
            >
              <ListItem sx={{ bgcolor: "#eeeef0", mb: 1 }}>
                <ListItemText
                  primary={"中間試験"}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {"実施日 : " +
                          (middleExamData.Xday === "未入力"
                            ? "未入力"
                            : "seconds" in middleExamData.Xday
                            ? middleExamData.Xday.toDate().toLocaleDateString()
                            : new Date(
                                middleExamData.Xday
                              ).toLocaleDateString())}
                      </Typography>
                      {(() => {
                        if (middleExamData.Xday === "未入力") {
                          return " — 未入力";
                        } else if (middleExamData.isFinished) {
                          return " — 成績" + middleExamData.score + "点";
                        } else if (!middleExamData.isFinished) {
                          return " — 成績" + "未実施";
                        }
                      })()}
                      <div
                        style={{
                          whiteSpace: "pre-wrap",
                          overflowWrap: "break-word",
                        }}
                      >
                        {middleExamData.title}
                      </div>
                    </React.Fragment>
                  }
                />
                <IsFinishMiddle data={middleExamData} name={name} set={set} />
                <ChangeMiddle data={middleExamData} name={name} set={set} />
              </ListItem>
            </Box>
          </List>
        </Box>
      )}
    </div>
  );
}
