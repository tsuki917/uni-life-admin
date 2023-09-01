import React, { useEffect, useState } from "react";
import { Box, Button, List } from "@mui/material";
import { db, auth } from "../../libs/fire";
import { collection, getDocs } from "firebase/firestore";
import Task from "./Task";
export default function Tasks() {

  const [recentsData, setRecentData] = useState([]);
  if (auth.currentUser !== null) {
    useEffect(() => {
    const data = getRecentEventData();
    data.then((ele) => {
      console.log(ele);
      setRecentData(ele);
    });
  }, []);

  return (
    <Box sx={{ mr: 6, ml: 6 }}>
      <h1>直近の課題</h1>
      <List>
        {recentsData.map((recentData, key) => {
          return (
            <Box key={key}>
              <Task eventsData={recentData} />
            </Box>
          );
        })}
      </List>
    </Box>
  );
  }

}

async function getRecentEventData() {
  const eventsData = [];
  const userCollenction = collection(db, auth.currentUser.email);
  const q = await getDocs(userCollenction);

  q.forEach((ele) => {
    const subjectData = ele.data();
    subjectData.reports.reportArray.forEach((reportData) => {
      const pushData = {
        subjectName: subjectData.name,
        reportData: reportData,
        distDay: getDaysRemaining(reportData.deadlineDay),
      };

      if (pushData.distDay < 8 && pushData.distDay > -2) {
        eventsData.push(pushData);
      }
    });
    subjectData.smallExam.smallExamArray.forEach((smallExamData) => {
      const pushData = {
        subjectName: subjectData.name,
        smallExamData: smallExamData,
        distDay: getDaysRemaining(smallExamData.Xday),
      };
      if (pushData.distDay < 8 && pushData.distDay > -2) {
        eventsData.push(pushData);
      }
    });

    if (
      getDaysRemaining(subjectData.middleExam.Xday) < 8 &&
      getDaysRemaining(subjectData.middleExam.Xday) > -2
    ) {
      eventsData.push({
        subjectName: subjectData.name,
        middleExamData: subjectData.middleExam,
        distDay: getDaysRemaining(subjectData.middleExam.Xday),
      });
    }
    if (
      getDaysRemaining(subjectData.finalExam.Xday) < 8 &&
      getDaysRemaining(subjectData.finalExam.Xday) > -2
    ) {
      eventsData.push({
        subjectName: subjectData.name,
        finalExamData: subjectData.finalExam,
        distDay: getDaysRemaining(subjectData.finalExam.Xday),
      });
    }
  });
  eventsData.sort((a, b) => {
    return a.distDay - b.distDay;
  });
  return eventsData;
}

function getDaysRemaining(dayTime) {
  const today = new Date();

  // pushData.reportData.deadlineDayから秒とナノ秒を取得
  const deadlineSeconds = dayTime.seconds;
  const deadlineNanoseconds = dayTime.nanoseconds;

  // タイムスタンプをミリ秒に変換
  const deadlineTimestampMillis =
    deadlineSeconds * 1000 + deadlineNanoseconds / 1000000;

  // 締め切り日をDateオブジェクトとして生成
  const deadlineDate = new Date(deadlineTimestampMillis);

  // 今日の日付と締め切り日との日付の差を計算
  const timeDiffMillis = deadlineDate - today;
  const daysRemaining = Math.floor(timeDiffMillis / (1000 * 60 * 60 * 24));
  return daysRemaining;
}
