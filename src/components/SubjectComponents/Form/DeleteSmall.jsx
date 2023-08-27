import { auth, db } from "../../../libs/fire";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

export const DeleteSmall = ({ rate, data, index, name, set }) => {
  const [flag, setFlag] = useState(false);
  const changeFlag = () => {
    setFlag((prev) => !prev);
  };
  const onAddEvent = async () => {
    const newData = [...data];
    newData.splice(index, 1);
    const event = {
      smallExam: {
        rate: rate,
        smallExamArray: newData,
      },
    };
    await updateDoc(doc(db, auth.currentUser.email, name), event);
    changeFlag();
    set(event.smallExam.smallExamArray);
  };
  return (
    <div>
      <button onClick={changeFlag}>削除</button>
      {flag && (
        <div>
          本当に消しますか？
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
