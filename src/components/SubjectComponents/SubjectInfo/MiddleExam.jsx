import React, { useState } from "react";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { ChangeMiddle } from "../Form/ChangeMiddle";
import { ChaMidRate } from "../Form/ChaMidRate";
import IsFinishMiddle from "../Form/IsFinishMiddle";
export default function MiddleExam({ middleExamData, name, set }) {
  return middleExamData === null ? (
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
          中間試験 <span>成績配分 : {middleExamData.rate}%</span>
        </h2>
        <ChaMidRate data={middleExamData} name={name} set={set} />
      </Box>
      <List>
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
              primary={"中間試験"}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {"実施日 : " +
                      (middleExamData.Xday === "未入力"
                        ? "未入力"
                        : "seconds" in middleExamData.Xday
                        ? middleExamData.Xday.toDate().toLocaleDateString()
                        : new Date(middleExamData.Xday).toLocaleDateString())}
                  </Typography>
                  {(() => {
                    if (middleExamData.Xday === "未入力") {
                      return " — 未入力";
                    } else if (middleExamData.isFinished) {
                      return " — 成績" + middleExamData.score + "点";
                    } else if (!middleExamData.isFinished) {
                      return " — 成績" + "未実施";
                    }
                  })()}
                </React.Fragment>
              }
            />
            <IsFinishMiddle data={middleExamData} name={name} set={set} />
            <ChangeMiddle data={middleExamData} name={name} set={set} />
          </ListItem>
        </Box>
      </List>
    </Box>
  );
}
