import React from "react";
import { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { Box, Button } from "@mui/material";
import { db, auth } from "../../../libs/fire";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function IsFinishMiddle({ data, name, set }) {
  const theme = useTheme();
  const [isFinished, setIsFinished] = useState(data.isFinished);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const onAddEvent = async () => {
    setIsFinished((prev) => !prev);
    const event = {
      middleExam: {
        score: data.score,
        Xday: data.Xday,
        isFinished: !data.isFinished,
        rate: data.rate,
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    set(event.middleExam);
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
              実施済
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
              未実施
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
              実施済
            </Button>
          ) : (
            <Button
              variant="outlined"
              sx={{ color: "#cd3131", borderColor: "#cd3131", p: 0, mr: 1 }}
              onClick={onAddEvent}
            >
              未実施
            </Button>
          )}
        </Box>
      )}
    </div>
  );
}
