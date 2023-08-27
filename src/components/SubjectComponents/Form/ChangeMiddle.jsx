import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

export const ChangeMiddle = ({ data, name, set }) => {
  const [Xday, setXday] = useState(data.Xday);
  const [score, setScore] = useState(data.score);
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    const event = {
      middleExam: {
        Xday: Xday,
        rate: data.rate,
        score: Number(score),
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    changeFlag();
    set(event.middleExam);
  };
  return (
    <div>
      <button onClick={changeFlag}>変更</button>
      {flag && (
        <div>
          <label>
            実施日
            <input
              //className=
              type="text"
              value={Xday}
              name="inputTitle"
              onChange={(e) => {
                setXday(e.target.value);
              }}
            />
          </label>
          <label>
            点数
            <input
              //className=
              type="number"
              value={score}
              //name=
              min="0"
              onChange={(e) => {
                setScore(e.target.value);
              }}
            />
          </label>
          <input
            //className=
            type="button"
            value="確定"
            onClick={onAddEvent}
          />
        </div>
      )}
    </div>
  );
};
