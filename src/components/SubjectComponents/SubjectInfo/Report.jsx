import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

export default function Report({ reportData, reportRate }) {
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
