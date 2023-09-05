import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const IsFinishReport = ({ rate, data, index, name, set }) => {
  const theme = useTheme();
  const [isFinished, setIsFinished] = useState(data[index].isFinished);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const onAddEvent = async () => {
    const newData = [...data];
    newData[index].isFinished = !isFinished;
    setIsFinished((prev) => !prev);
    const event = {
      reports: {
        rate: rate,
        reportArray: newData,
      },
    };
    console.log(newData);
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    set(event.reports.reportArray);
  };
  return (
    <div>
      {isSmallScreen ? (
        <Box>
          {isFinished ? (
            <Button
              variant="outlined"
              sx={{
                color: "#269746",
                borderColor: "#269746",
                p: 0,
                height: 30,
              }}
              onClick={onAddEvent}
            >
              完了済
            </Button>
          ) : (
            <Button
              variant="outlined"
              sx={{
                color: "#cd3131",
                borderColor: "#cd3131",
                p: 0,
                height: 30,
              }}
              onClick={onAddEvent}
            >
              未完了
            </Button>
          )}
        </Box>
      ) : (
        <Box>
          {isFinished ? (
            <Button
              variant="outlined"
              sx={{ color: "#269746", borderColor: "#269746", p: 0, mr: 1 }}
              onClick={onAddEvent}
            >
              完了済
            </Button>
          ) : (
            <Button
              variant="outlined"
              sx={{ color: "#cd3131", borderColor: "#cd3131", p: 0, mr: 1 }}
              onClick={onAddEvent}
            >
              未完了
            </Button>
          )}
        </Box>
      )}
    </div>
  );
};
