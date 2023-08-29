import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "../../libs/fire";
import { doc, getDoc } from "firebase/firestore";
import Report from "./SubjectInfo/Report";
import FinalExam from "./SubjectInfo/finalExam";
import MiddleExam from "./SubjectInfo/MiddleExam";
import SmallExam from "./SubjectInfo/SmallExam";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, Button } from "@mui/material";
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
      const middleExamPoint = middleExamData
        ? middleExamData.score * middleExamData.rate * 0.01
        : 0;
      const middleMaxScore =
        middleExamData.score !== 0 ? middleExamData.rate : 0;
      const finalExamPoint = finalExamData
        ? finalExamData.score * finalExamData.rate * 0.01
        : 0;
      const finalMaxScore = finalExamData.score !== 0 ? finalExamData.rate : 0;
      let smallExamPoint = 0;
      if (smallExamData.length !== 0) {
        smallExamData.forEach((ele) => {
          smallExamPoint += ele.score / smallExamData.length;
        });
      }
      smallExamPoint *= smallExamRate * 0.01;

      const smallMaxScore = smallExamData.length > 0 ? smallExamRate : 0;

      let reportPoint = 0;

      reportData.forEach((ele) => {
        reportPoint += ele.score / reportData.length;
      });
      reportPoint *= reportRate * 0.01;
      const reportMaxScore = reportData.length > 0 ? reportRate : 0;
      maxScore += parseFloat(middleMaxScore);
      maxScore += parseFloat(finalMaxScore);
      maxScore += parseFloat(reportMaxScore);
      maxScore += parseFloat(smallMaxScore);

      scorePre += middleExamPoint;
      scorePre += finalExamPoint;
      scorePre += smallExamPoint;
      scorePre += reportPoint;
      console.log(scorePre + ": scorePre");
      const scoreRatePre = Math.round((scorePre / maxScore) * 100 * 10) / 10;
      scorePre = Math.round(scorePre * 10) / 10;
      setScore(scorePre);
      setScoreRate(scoreRatePre);
      console.log(maxScore + ":maxScore");
      console.log(score);
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
    <div>
      <Link component={LinkRouter} to={"/subjects"}>
        <ArrowBackIcon />
      </Link>
      <h1>{targetSubject}</h1>
      <h1>得点率:{scoreRate}%</h1>
      <h1>得点:{score}</h1>
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
    </div>
  );
}

async function getFirebaseData(subject) {
  const subjectData = await getDoc(doc(db, auth.currentUser.email, subject));
  return subjectData.data();
}
