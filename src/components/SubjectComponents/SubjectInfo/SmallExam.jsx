import React, { useState } from "react";
import { List, ListItem, ListItemText, Box, Typography } from "@mui/material";
import { ChangeSmall } from "../../Form/ChangeSmall";
import { AddSmall } from "../../Form/AddSmall";
export default function SmallExam({ smallExamData, smallExamRate, name, set }) {
  return (
    <div>
      <h2>
        小テスト <span>成績配分 : {smallExamRate}%</span>
      </h2>
      <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <AddSmall
          rate={smallExamRate}
          data={smallExamData}
          name={name}
          set={set}
        />
      </Box>
      <List sx={{ ml: 4 }}>
        {smallExamData.map((smallExamElement, key) => {
          return (
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
                      {"実施日 : " + smallExamElement.Xday}
                    </Typography>
                    {/* content */}
                    {" — 成績" + smallExamElement.score + "点"}
                    <ChangeSmall
                      rate={smallExamRate}
                      data={smallExamData}
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
