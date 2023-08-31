import React, { useEffect, useState } from "react";
import { Box, Button, List } from "@mui/material";
import { db, auth } from "../../libs/fire";
import { collection, getDocs } from "firebase/firestore";
import Task from "./Task";
export default function Tasks() {
  const [reportsState, setReportsState] = useState([]);

  useEffect(() => {
    const data = getAllReportData();
    data.then((ele) => {
      console.log(ele);
      setReportsState(ele);
    });
  }, []);

  return (
    <Box sx={{ mr: 6, ml: 6 }}>
      <h3>直近の課題</h3>
      <List>
        {reportsState.map((reportData, key) => {
          return (
            <Box key={key}>
              <Task reportsData={reportData} />
            </Box>
          );
        })}
      </List>

      <Button onClick={getAllReportData}>report</Button>
    </Box>
  );
}

async function getAllReportData() {
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
      // const test = new Date();
      // console.log(test);
      // console.log(pushData.reportData.deadlineDay);
      // const dist =
      //   pushData.reportData.deadlineDay.nanoseconds - Date.now() / 1000;
      // console.log(pushData.subjectName);
      // console.log(pushData.reportData.title);
      // console.log("今日" + Date.now());
      // console.log("nano" + pushData.reportData.deadlineDay.nanoseconds);
      // console.log(Math.floor(dist / (60 * 60 * 24 * 1000)));
      // 今日の日付を取得
      const today = new Date();

      // pushData.reportData.deadlineDayから秒とナノ秒を取得
      const deadlineSeconds = pushData.reportData.deadlineDay.seconds;
      const deadlineNanoseconds = pushData.reportData.deadlineDay.nanoseconds;

      // タイムスタンプをミリ秒に変換
      const deadlineTimestampMillis =
        deadlineSeconds * 1000 + deadlineNanoseconds / 1000000;

      // 締め切り日をDateオブジェクトとして生成
      const deadlineDate = new Date(deadlineTimestampMillis);

      // 今日の日付と締め切り日との日付の差を計算
      const timeDiffMillis = deadlineDate - today;
      const daysRemaining = Math.floor(timeDiffMillis / (1000 * 60 * 60 * 24));

      console.log("Days Remaining:", daysRemaining);
      if (daysRemaining < 8) {
        reportsData.push(pushData);
      }
    });
  });
  return reportsData;
}
