import React, { useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { ChangeFinal } from "../../Form/ChangeFinal";
export default function FinalExam({ finalExamData, name, set }) {
  return finalExamData === null ? (
    <div>loading</div>
  ) : (
    <div>
      <h2>
        期末試験 <span>成績配分 : {finalExamData.rate}%</span>
      </h2>
      <List sx={{ ml: 4 }}>
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
                  {"実施日 : " + finalExamData.Xday}
                </Typography>
                {/* content */}
                {" — 成績" + finalExamData.score}
                <ChangeFinal data={finalExamData} name={name} set={set} />
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </div>
  );
}
