import React, { useState } from "react";

import { List, ListItem, ListItemText, Box, Typography } from "@mui/material";
import { ChangeSmall } from "../Form/ChangeSmall";
import { ChaSmaRate } from "../Form/ChaSmaRate";
import { AddSmall } from "../Form/AddSmall";
import { DeleteSmall } from "../Form/DeleteSmall";
export default function SmallExam({
  smallExamData,
  smallExamRate,
  name,
  setData,
  setRate,
}) {
  return (
    <div>
      <h2>
        小テスト <span>成績配分 : {smallExamRate}%</span>
      </h2>
      <ChaSmaRate data={smallExamData} name={name} set={setRate} />

      <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <AddSmall
          rate={smallExamRate}
          data={smallExamData}
          name={name}
          set={setData}
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
                      {"実施日 : " +
                        ("seconds" in smallExamElement.Xday
                          ? smallExamElement.Xday.toDate().toLocaleDateString()
                          : new Date(
                              smallExamElement.Xday
                            ).toLocaleDateString())}
                    </Typography>
                    {/* content */}
                    {" — 成績" + smallExamElement.score + "点"}
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
