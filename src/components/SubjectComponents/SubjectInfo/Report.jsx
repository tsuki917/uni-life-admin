import React, { useState } from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { ChangeReport } from "../Form/ChangeReport";
import { ChaRepRate } from "../Form/ChaRepRate";
import { AddReport } from "../Form/AddReport";
import { DeleteReport } from "../Form/DeleteReport";
import { IsFinishReport } from "../Form/IsFinishReport";

export default function Report({
  reportData,
  reportRate,
  name,
  setData,
  setRate,
}) {
  return (
    <Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-start",
          width: 1,
          textAlign: "center",
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
                      {" — 成績" + reportArrayData.score + "点"}
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
  );
}
