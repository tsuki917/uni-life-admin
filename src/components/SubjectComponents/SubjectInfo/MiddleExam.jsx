import React, { useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { ChangeMiddle } from "../Form/ChangeMiddle";
import { ChaMidRate } from "../Form/ChaMidRate";
export default function MiddleExam({ middleExamData, name, set }) {
  console.log(middleExamData);
  return middleExamData === null ? (
    <div>loading</div>
  ) : (
    <div>
      <h2>
        中間試験 <span>成績配分 : {middleExamData.rate}%</span>
      </h2>
      <ChaMidRate data={middleExamData} name={name} set={set} />
      <List sx={{ ml: 4 }}>
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
                  {"実施日 : " + middleExamData.Xday}
                </Typography>
                {" — 成績" + middleExamData.score}
                <ChangeMiddle data={middleExamData} name={name} set={set} />
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </div>
  );
}
