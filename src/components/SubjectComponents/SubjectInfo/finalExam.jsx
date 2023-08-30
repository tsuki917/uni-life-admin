import React, { useState } from "react";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { ChangeFinal } from "../Form/ChangeFinal";
import { ChaFinRate } from "../Form/ChaFinRate";

export default function FinalExam({ finalExamData, name, set }) {
  return finalExamData === null ? (
    <div>loading</div>
  ) : (
    <Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      >
        <h2>
          期末試験 <span>成績配分 : {finalExamData.rate}%</span>
        </h2>
        <ChaFinRate data={finalExamData} name={name} set={set} />
      </Box>
      <List sx={{ ml: 4 }}>
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
                    {"実施日 : " + finalExamData.Xday}
                  </Typography>
                  {/* content */}
                  {" — 成績" + finalExamData.score + "点"}
                </React.Fragment>
              }
            />
            <ChangeFinal data={finalExamData} name={name} set={set} />
          </ListItem>
        </Box>
      </List>
    </Box>
  );
}
