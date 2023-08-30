import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { db, auth } from "../../libs/fire";
import { collection, getDocs } from "firebase/firestore";
export default function Task() {
  const [reportsState, setReportsState] = useState([]);
  const getAllReportData = async () => {
    const reportsData = [];
    const userCollenction = collection(db, auth.currentUser.email);
    const q = await getDocs(userCollenction);

    q.forEach((ele) => {
      const subjectData = ele.data();
      subjectData.reports.reportArray.forEach((reportData) => {
        const pushData = {
          subjectName: subjectData.name,
          reportData: {},
        };
        pushData.reportData = reportData;
        reportsData.push(pushData);
      });
    });
    setReportsState(reportsData);
  };

  return (
    <Box>
      <h3>Task</h3>

      {reportsState.map((ele, key) => {
        return <Box key={key}>{ele.reportData.score}</Box>;
      })}

      <Button onClick={getAllReportData}>report</Button>
    </Box>
  );
}
