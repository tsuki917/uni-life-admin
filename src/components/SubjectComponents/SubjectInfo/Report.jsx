import React, { useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { ChangeReport } from "../../Form/ChangeReport";

export default function Report({ reportData, reportRate, name, set }) {
  return (
    <div>
      <h2>
        課題 <span>成績配分 : {reportRate}%</span>
      </h2>
      <List sx={{ ml: 4 }}>
        {reportData.map((reportArrayData, key) => {
          return (
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
                      {"期限 : " + reportArrayData.deadlineDay}
                    </Typography>
                    {/* content */}
                    {" — 成績" + reportArrayData.score}
                    <ChangeReport
                      rate={reportRate}
                      data={reportData}
                      index={key}
                      name={name}
                      set={set}
                    />
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
