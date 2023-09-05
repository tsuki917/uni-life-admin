import React, { useState } from "react";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { ChangeFinal } from "../Form/ChangeFinal";
import { ChaFinRate } from "../Form/ChaFinRate";
import IsFinishFinal from "../Form/IsFinishFinal";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function FinalExam({ finalExamData, name, set }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      {isSmallScreen ? (
        finalExamData === null ? (
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
                期末試験 <span>成績配分 : {finalExamData.rate}%</span>
              </h3>
              <ChaFinRate data={finalExamData} name={name} set={set} />
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
                    primary={"期末試験"}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {"実施日 : " +
                            (finalExamData.Xday === "未入力"
                              ? "未入力"
                              : "seconds" in finalExamData.Xday
                              ? finalExamData.Xday.toDate().toLocaleDateString()
                              : new Date(
                                  finalExamData.Xday
                                ).toLocaleDateString())}
                        </Typography>
                        {/* content */}
                        {(() => {
                          if (finalExamData.Xday === "未入力") {
                            return (
                              <span style={{ display: "block" }}>— 未実施</span>
                            );
                          } else if (finalExamData.isFinished) {
                            return (
                              <span style={{ display: "block" }}>
                                — 成績{finalExamData.score}点
                              </span>
                            );
                          } else if (!finalExamData.isFinished) {
                            return (
                              <span style={{ display: "block" }}>— 未実施</span>
                            );
                          }
                        })()}
                        <div
                          style={{
                            whiteSpace: "pre-wrap",
                            overflowWrap: "break-word",
                          }}
                        >
                          {finalExamData.title}
                        </div>
                      </React.Fragment>
                    }
                  />
                  <IsFinishFinal data={finalExamData} name={name} set={set} />
                  <ChangeFinal data={finalExamData} name={name} set={set} />
                </ListItem>
              </Box>
            </List>
          </Box>
        )
      ) : finalExamData === null ? (
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
              期末試験 <span>成績配分 : {finalExamData.rate}%</span>
            </h2>
            <ChaFinRate data={finalExamData} name={name} set={set} />
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
                  primary={"期末試験"}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {"実施日 : " +
                          (finalExamData.Xday === "未入力"
                            ? "未入力"
                            : "seconds" in finalExamData.Xday
                            ? finalExamData.Xday.toDate().toLocaleDateString()
                            : new Date(
                                finalExamData.Xday
                              ).toLocaleDateString())}
                      </Typography>
                      {/* content */}
                      {(() => {
                        if (finalExamData.Xday === "未入力") {
                          return " — 未実施";
                        } else if (finalExamData.isFinished) {
                          return " — 成績" + finalExamData.score + "点";
                        } else if (!finalExamData.isFinished) {
                          return " — 未実施";
                        }
                      })()}
                      <div
                        style={{
                          whiteSpace: "pre-wrap",
                          overflowWrap: "break-word",
                        }}
                      >
                        {finalExamData.title}
                      </div>
                    </React.Fragment>
                  }
                />
                <IsFinishFinal data={finalExamData} name={name} set={set} />
                <ChangeFinal data={finalExamData} name={name} set={set} />
              </ListItem>
            </Box>
          </List>
        </Box>
      )}
    </div>
  );
}
