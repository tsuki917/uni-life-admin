import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

export const ChaSmaRate = ({ oldRate, data, name, set }) => {
  const [rate, setRate] = useState(oldRate);
  const [flag, setFlag] = useState(false);
  console.log(rate);

  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    const event = {
      smallExam: {
        rate: Number(rate),
        smallExamArray: data,
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    changeFlag();
    set(Number(rate));
  };
  return (
    <div>
      <button onClick={changeFlag}>割合変更</button>
      {flag && (
        <div>
          <label>
            割合
            <input
              //className=
              type="number"
              value={rate}
              //name=
              min="0"
              max="100"
              onChange={(e) => {
                setRate(Number(e.target.value));
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
