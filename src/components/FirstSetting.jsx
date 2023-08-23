import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FirstSetting() {
  const [subjectData, setSubjectData] = useState({
    subjectName: "Noname",
    smallExamRate: 0,
    middleExamRate: 0,
    finalExamRate: 0,
    smallExamPoint: [],
    middleExamPoint: null,
    finalExamPoint: null,
    reportRate: 0,
    reportPoints: [],
  });
  const navigation = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(subjectData);
    navigation("/");
  };

  return (
    <div className="input-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subjectName">教科名</label>
          <input
            className="subjectName"
            name="subjectName"
            value={subjectData.subjectName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="smallExamRate">小テストの成績比率</label>
          <input
            className="smallExamRate"
            name="smallExamRate"
            value={subjectData.smallExamRate}
            onChange={handleChange}
            type="smallExamRate"
          />
        </div>
        <div>
          <label htmlFor="middleExamRate">中間試験の成績比率</label>
          <input
            className="middleExamRate"
            name="middleExamRate"
            value={subjectData.middleExamRate}
            onChange={handleChange}
            type="middleExamRate"
          />
        </div>
        <div>
          <label htmlFor="finalExamRate">期末試験の成績比率</label>
          <input
            className="finalExamRate"
            name="finalExamRate"
            value={subjectData.finalExamRate}
            onChange={handleChange}
            type="finalExamRate"
          />
        </div>
        <div>
          <button type="submit">作成</button>
        </div>
      </form>
    </div>
  );
}
