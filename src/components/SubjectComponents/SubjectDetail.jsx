import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "../../libs/fire";
import { doc, getDoc } from "firebase/firestore";
import Report from "./SubjectInfo/Report";
import FinalExam from "./SubjectInfo/FinalExam";
import MiddleExam from "./SubjectInfo/MiddleExam";
import SmallExam from "./SubjectInfo/SmallExam";
import { ChangeSubject } from "./Form/ChangeSubject";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, Button, Box } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";
export default function SubjectDetail() {
  const [smallExamData, setSmallExamData] = useState([]);
  const [smallExamRate, setSmallExamRate] = useState(0);
  const [middleExamData, setMiddleExamData] = useState(null);
  const [finalExamData, setFinalExamData] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [reportRate, setReportRate] = useState(0);
  const [score, setScore] = useState(0);
  const [scoreRate, setScoreRate] = useState(0);
  const [name, setName] = useState("");
  const [all, setAll] = useState();
  const [subjectName, setSubjectName] = useState("");
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag(() => true);
  };

  const data = decodeURI(useLocation().pathname);
  const targetSubject = data.split("subjects/")[1];

  useEffect(() => {
    const fetchData = getFirebaseData(targetSubject);
    fetchData.then((ele) => {
      setReportData(ele.reports.reportArray);
      setSmallExamData(ele.smallExam.smallExamArray);
      setReportRate(ele.reports.rate);
      setSmallExamRate(ele.smallExam.rate);
      setMiddleExamData(ele.middleExam);
      console.log(ele.middleExam);
      setFinalExamData(ele.finalExam);
      setName(ele.name);
      setAll(ele);
    });
  }, []);

  useEffect(() => {
    if (
      smallExamData != null &&
      middleExamData !== null &&
      finalExamData !== null &&
      reportData !== null
    ) {
      let scorePre = 0;
      let maxScore = 0;
      const middleExamPoint = middleExamData.isFinished
        ? middleExamData.score * middleExamData.rate * 0.01
        : 0;
      const middleMaxScore = middleExamData.isFinished
        ? middleExamData.rate
        : 0;
      const finalExamPoint = finalExamData.isFinished
        ? finalExamData.score * finalExamData.rate * 0.01
        : 0;
      const finalMaxScore = finalExamData.isFinished ? finalExamData.rate : 0;
      let smallExamPoint = 0;
      let smallIsFinishedLength = 0;
      smallExamData.forEach((ele) => {
        if (ele.isFinished) {
          smallIsFinishedLength++;
        }
      });
      console.log(smallIsFinishedLength);
      if (smallIsFinishedLength > 0) {
        smallExamData.forEach((ele) => {
          smallExamPoint += ele.score / smallIsFinishedLength;
        });
      }
      smallExamPoint *= smallExamRate * 0.01;

      const smallMaxScore = smallIsFinishedLength > 0 ? smallExamRate : 0;

      let reportPoint = 0;
      let reportIsFinishedLength = 0;
      reportData.forEach((ele) => {
        if (ele.isFinished) {
          reportIsFinishedLength++;
        }
      });
      if (reportIsFinishedLength > 0) {
        reportData.forEach((ele) => {
          reportPoint += ele.score / reportData.length;
        });
      }
      reportPoint *= reportRate * 0.01;
      const reportMaxScore = reportIsFinishedLength > 0 ? reportRate : 0;
      maxScore += parseFloat(middleMaxScore);
      maxScore += parseFloat(finalMaxScore);
      maxScore += parseFloat(reportMaxScore);
      maxScore += parseFloat(smallMaxScore);

      scorePre += middleExamPoint;
      scorePre += finalExamPoint;
      scorePre += smallExamPoint;
      scorePre += reportPoint;
      const scoreRatePre =
        maxScore !== 0
          ? Math.round((scorePre / maxScore) * 100 * 10) / 10
          : "-";
      scorePre = Math.round(scorePre * 10) / 10;
      setScore(scorePre);
      setScoreRate(scoreRatePre);
    }
  }, [
    smallExamData,
    smallExamRate,
    middleExamData,
    finalExamData,
    reportData,
    reportRate,
  ]);
  return reportData === undefined ? (
    <div>
      <p>Loding</p>
      <Button
        onClick={() => {
          console.log(reportData);
        }}
      ></Button>
    </div>
  ) : (
    <Box sx={{ mx: 6 }}>
      <Link component={LinkRouter} to={"/subjects"}>
        <ArrowBackIcon />
      </Link>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-start",
          width: 1,
          textAlign: "center",
        }}
      >
        <Box>
          <h1>{flag ? subjectName : targetSubject}</h1>
        </Box>

        <ChangeSubject
          all={all}
          setAll={setAll}
          setSubject={setSubjectName}
          change={changeFlag}
        />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <h3 style={{ marginRight: "10px" }}>得点率:{scoreRate}%</h3>
          <h3>得点:{score}</h3>
        </Box>
      </Box>
      {finalExamData !== null &&
        middleExamData !== null &&
        reportRate !== null &&
        smallExamRate !== null &&
        parseInt(reportRate) +
          parseInt(smallExamRate) +
          parseInt(middleExamData.rate) +
          parseInt(finalExamData.rate) !==
          100 && (
          <p style={{ color: "red" }}>
            割合の合計が100%ではありません（現在
            {parseInt(reportRate) +
              parseInt(smallExamRate) +
              parseInt(middleExamData.rate) +
              parseInt(finalExamData.rate)}
            ％）
          </p>
        )}
      <Report
        reportData={reportData}
        reportRate={reportRate}
        name={name}
        setData={setReportData}
        setRate={setReportRate}
      />
      <SmallExam
        smallExamData={smallExamData}
        smallExamRate={smallExamRate}
        name={name}
        setData={setSmallExamData}
        setRate={setSmallExamRate}
      />
      <MiddleExam
        middleExamData={middleExamData}
        name={name}
        set={setMiddleExamData}
      />
      <FinalExam
        finalExamData={finalExamData}
        name={name}
        set={setFinalExamData}
      />
    </Box>
  );
}

async function getFirebaseData(subject) {
  const subjectData = await getDoc(doc(db, auth.currentUser.email, subject));
  return subjectData.data();
}
