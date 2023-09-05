import React, { useState } from "react";

import { List, ListItem, ListItemText, Box, Typography } from "@mui/material";
import { ChangeSmall } from "../Form/ChangeSmall";
import { ChaSmaRate } from "../Form/ChaSmaRate";
import { AddSmall } from "../Form/AddSmall";
import { DeleteSmall } from "../Form/DeleteSmall";
import { IsFinishSmall } from "../Form/IsFinishSmall";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
export default function SmallExam({
  smallExamData,
  smallExamRate,
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
              小テスト <span>成績配分 : {smallExamRate}%</span>
            </h3>
            <ChaSmaRate data={smallExamData} name={name} set={setRate} />
          </Box>

          <List>
            {smallExamData.map((smallExamElement, key) => {
              return (
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    // width: 1,
                  }}
                >
                  <ListItem
                    sx={{
                      bgcolor: "#eeeef0",
                      mb: 1,
                    }}
                    key={key}
                  >
                    <ListItemText
                      primary={smallExamElement.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {"実施日 : " +
                              ("seconds" in smallExamElement.Xday
                                ? smallExamElement.Xday.toDate().toLocaleDateString()
                                : new Date(
                                    smallExamElement.Xday
                                  ).toLocaleDateString())}
                          </Typography>
                          {/* content */}
                          {smallExamElement.isFinished ? (
                            <span style={{ display: "block" }}>
                              — 成績{smallExamElement.score}点
                            </span>
                          ) : (
                            <span style={{ display: "block" }}>
                              — 成績 未実施
                            </span>
                          )}
                        </React.Fragment>
                      }
                    />

                    <IsFinishSmall
                      rate={smallExamRate}
                      data={smallExamData}
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
                      <ChangeSmall
                        rate={smallExamRate}
                        data={smallExamData}
                        index={key}
                        name={name}
                        set={setData}
                      />
                      <DeleteSmall
                        rate={smallExamRate}
                        data={smallExamData}
                        index={key}
                        name={name}
                        set={setData}
                      />
                    </Box>
                  </ListItem>
                </Box>
              );
            })}
          </List>
          <AddSmall
            rate={smallExamRate}
            data={smallExamData}
            name={name}
            set={setData}
          />
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
              小テスト <span>成績配分 : {smallExamRate}%</span>
            </h2>
            <ChaSmaRate data={smallExamData} name={name} set={setRate} />
          </Box>

          <List>
            {smallExamData.map((smallExamElement, key) => {
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
                      primary={smallExamElement.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {"実施日 : " +
                              ("seconds" in smallExamElement.Xday
                                ? smallExamElement.Xday.toDate().toLocaleDateString()
                                : new Date(
                                    smallExamElement.Xday
                                  ).toLocaleDateString())}
                          </Typography>
                          {/* content */}
                          {smallExamElement.isFinished
                            ? " — 成績" + smallExamElement.score + "点"
                            : " — 成績 未実施"}
                        </React.Fragment>
                      }
                    />
                    <IsFinishSmall
                      rate={smallExamRate}
                      data={smallExamData}
                      index={key}
                      name={name}
                      set={setData}
                    />
                    <ChangeSmall
                      rate={smallExamRate}
                      data={smallExamData}
                      index={key}
                      name={name}
                      set={setData}
                    />
                    <DeleteSmall
                      rate={smallExamRate}
                      data={smallExamData}
                      index={key}
                      name={name}
                      set={setData}
                    />
                  </ListItem>
                </Box>
              );
            })}
          </List>
          <AddSmall
            rate={smallExamRate}
            data={smallExamData}
            name={name}
            set={setData}
          />
        </Box>
      )}
    </div>
  );
}
