import React, { useState } from "react";
import { auth, db } from "../../libs/fire";
import { doc, setDoc } from "firebase/firestore";
export default function Subjects() {
  /*
    type subjectData = {
        
    }
    
    */
  const subjectsData = useState([]);

  const [f_Xday, setF_Xday] = useState("");
  const [f_rate, setF_rate] = useState("0");
  const [f_score, setF_score] = useState("0");
  const onAddEvent = async () => {
    const event = {
      finalExam: {
        Xday: f_Xday,
        rate: Number(f_rate),
        score: Number(f_score),
      },
      // middleExam:
      // reports:
      // smallExam:
    };
    await setDoc(doc(db, auth.currentUser.email, "フーリエ変換"), event);
  };
  return (
    <div>
      <h1>subject</h1>
      <div>中間試験</div>

      <label>
        試験日
        <input
          //className=
          type="text"
          value={f_Xday}
          name="inputTitle"
          onChange={(e) => {
            setF_Xday(e.target.value);
          }}
        />
      </label>
      <label>
        割合
        <input
          //className=
          type="number"
          value={f_rate}
          name="inputTitle"
          min="0"
          max="100"
          onChange={(e) => {
            setF_rate(e.target.value);
          }}
        />
      </label>
      <label>
        点数
        <input
          //className=
          type="number"
          value={f_score}
          name="inputTitle"
          min="0"
          onChange={(e) => {
            setF_score(e.target.value);
          }}
        />
      </label>
      <input
        //className=
        type="button"
        value="追加"
        onClick={onAddEvent}
      />
    </div>
  );
}
