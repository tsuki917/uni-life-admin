import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
export default function MiddleExam({ middleExamData }) {
  console.log(middleExamData);
  return middleExamData === null ? (
    <div>loading</div>
  ) : (
    <div>
      <h2>
        中間試験 <span>成績配分 : {middleExamData.rate}%</span>
      </h2>
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
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </div>
  );
}
