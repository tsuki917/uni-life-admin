import React, { useState } from "react";
import { Button } from "@mui/material";

export default function AddSubject({ close }) {
  const [subjectName, setSubjectname] = useState("");
  const [finalRate, setFinalRate] = useState(0);
  const [middleRate, setMiddleRate] = useState(0);
  const [smallRate, setsmallRate] = useState(0);
  const [reportRate, setReportRate] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    close(false);
    console.log({
      subjectName,
      finalRate,
      middleRate,
      smallRate,
      reportRate,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          教科名
          <input
            //className=
            type="text"
            value={subjectName}
            //name=
            onChange={(e) => {
              setSubjectname(e.target.value);
            }}
          />
        </label>
        <label>
          課題割合
          <input
            //className=
            type="number"
            value={reportRate}
            //name=
            min="0"
            max="100"
            onChange={(e) => {
              setReportRate(e.target.value);
            }}
          />
        </label>
        <label>
          小テスト割合
          <input
            //className=
            type="number"
            value={smallRate}
            //name=
            min="0"
            onChange={(e) => {
              setsmallRate(e.target.value);
            }}
          />
        </label>
        <label>
          中間試験割合
          <input
            //className=
            type="number"
            value={middleRate}
            //name=
            min="0"
            onChange={(e) => {
              setMiddleRate(e.target.value);
            }}
          />
        </label>
        <label>
          期末試験割合
          <input
            //className=
            type="number"
            value={finalRate}
            //name=
            min="0"
            onChange={(e) => {
              setFinalRate(e.target.value);
            }}
          />
        </label>
        <Button
          //className=
          type="submit"
          value="確定"
        />
      </form>
    </div>
  );
}
