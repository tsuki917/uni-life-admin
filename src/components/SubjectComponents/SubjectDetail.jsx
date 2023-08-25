import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "../../libs/fire";
import { doc, getDoc } from "firebase/firestore";
import Report from "./SubjectInfo/Report";
import FinalExam from "./SubjectInfo/finalExam";
import MiddleExam from "./SubjectInfo/MiddleExam";
import SmallExam from "./SubjectInfo/SmallExam";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";
export default function SubjectDetail() {
  const [smallExamData, setSmallExamData] = useState([]);
  const [smallExamRate, setSmallExamRate] = useState(null);
  const [middleExamData, setMiddleExamData] = useState(null);
  const [finalExamData, setFinalExamData] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [reportRate, setReportRate] = useState(null);
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

  return reportData === undefined ? (
    <div>
      <p>Loding</p>
      <button
        onClick={() => {
          console.log(reportData);
        }}
      ></button>
    </div>
  ) : (
    <div>
      <Link component={LinkRouter} to={"/subjects"}>
        <ArrowBackIcon />
      </Link>
      <h1>{targetSubject}</h1>
      <Report reportData={reportData} reportRate={reportRate} name={name} />
      <SmallExam
        smallExamData={smallExamData}
        smallExamRate={smallExamRate}
        name={name}
      />
      <MiddleExam middleExamData={middleExamData} name={name} />
      <FinalExam finalExamData={finalExamData} name={name} />
    </div>
  );
}

async function getFirebaseData(subject) {
  const subjectData = await getDoc(doc(db, auth.currentUser.email, subject));
  return subjectData.data();
}
