import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  List,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { db, auth } from "../../libs/fire";
import { collection, getDocs } from "firebase/firestore";
import Task from "./Task";
export default function Tasks() {
  const [filterOption, setFilterOption] = useState(7);
  const [conIsFinished, setConIsFinished] = useState("all");

  const [recentsData, setRecentData] = useState([]);
  if (auth.currentUser !== null) {
    useEffect(() => {
      console.log("conIsFinish" + conIsFinished);
      const data = getRecentEventData(filterOption, conIsFinished);
      data.then((ele) => {
        setRecentData(ele);
      });
    }, [filterOption, conIsFinished]);
    const handleChangeDay = (event) => {
      setFilterOption(event.target.value);
    };
    const handleChangeIsFinished = (event) => {
      setConIsFinished(event.target.value);
    };

    return (
      <Box sx={{ mr: 6, ml: 6 }}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <h1>直近のイベント</h1>
          <Box sx={{ width: "30%" }}>
            <FormControl sx={{ mt: 2, width: "40%" }}>
              <InputLabel id="isFinished-simple-select-label"></InputLabel>
              <Select
                labelId="isFinished-simple-select-label"
                id="demo-simple-select"
                value={conIsFinished}
                label=""
                onChange={handleChangeIsFinished}
              >
                <MenuItem value={"all"}>すべて</MenuItem>
                <MenuItem value={"only-true"}>完了済のみ</MenuItem>
                <MenuItem value={"only-false"}>未完了のみ</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "40%", mt: 2 }}>
              <InputLabel id="day-simple-select-label"></InputLabel>
              <Select
                labelId="day-simple-select-label"
                id="demo-simple-select"
                value={filterOption}
                label=""
                onChange={handleChangeDay}
              >
                <MenuItem value={1}>1日後以内</MenuItem>
                <MenuItem value={3}>3日後以内</MenuItem>
                <MenuItem value={7}>1週間以内</MenuItem>
                <MenuItem value={14}>2週間以内</MenuItem>
                <MenuItem value={21}>3週間以内</MenuItem>
                <MenuItem value={30}>約1か月以内</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
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

async function getRecentEventData(filterOption, isFinishedCon) {
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

      if (pushData.distDay < filterOption && pushData.distDay > -1) {
        eventsData.push(pushData);
      }
    });
    subjectData.smallExam.smallExamArray.forEach((smallExamData) => {
      const pushData = {
        subjectName: subjectData.name,
        smallExamData: smallExamData,
        distDay: getDaysRemaining(smallExamData.Xday),
      };
      if (pushData.distDay < filterOption && pushData.distDay > -1) {
        eventsData.push(pushData);
      }
    });

    if (
      getDaysRemaining(subjectData.middleExam.Xday) < filterOption &&
      getDaysRemaining(subjectData.middleExam.Xday) > -1
    ) {
      eventsData.push({
        subjectName: subjectData.name,
        middleExamData: subjectData.middleExam,
        distDay: getDaysRemaining(subjectData.middleExam.Xday),
      });
    }
    if (
      getDaysRemaining(subjectData.finalExam.Xday) < filterOption &&
      getDaysRemaining(subjectData.finalExam.Xday) > -1
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
  const filtedData = eventsData.filter((ele) => {
    console.log("filted");
    if (isFinishedCon === "all") {
      console.log("all");
      return true;
    } else if (isFinishedCon === "only-true") {
      console.log("true-only");
      if (ele.finalExamData !== undefined) {
        return ele.finalExamData.isFinished;
      } else if (ele.middleExamData !== undefined) {
        return ele.middleExamData.isFinished;
      } else if (ele.reportData !== undefined) {
        return ele.reportData.isFinished;
      } else if (ele.smallExamData !== undefined) {
        return ele.smallExamData.isFinished;
      }
    } else if (isFinishedCon === "only-false") {
      console.log("false-only");
      if (ele.finalExamData !== undefined) {
        return !ele.finalExamData.isFinished;
      } else if (ele.middleExamData !== undefined) {
        return !ele.middleExamData.isFinished;
      } else if (ele.reportData !== undefined) {
        return !ele.reportData.isFinished;
      } else if (ele.smallExamData !== undefined) {
        return !ele.smallExamData.isFinished;
      }
    }
  });
  console.log(filtedData);
  return filtedData;
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
