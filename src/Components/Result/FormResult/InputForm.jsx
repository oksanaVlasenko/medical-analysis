import React from "react";

import "./style.css";

const InputForm = ({ item, gender }) => {
  function changeV(e, item) {
    item.userResult = e.target.value;
  }

  return (
    <label className="d-flex flex-row justify-content-between align-items-center lbl">
      {item.name}

      <div
        className="d-flex flex-row justify-content-between  align-items-center"
        style={{ width: "150px" }}
      >
        <input
          type="text"
          name="name"
          required
          placeholder={
            gender === "female"
              ? item.normal[0].women[0].min
              : item.normal[1].men[0].min
          }
          onChange={(e) => changeV(e, item)}
        />
        {item.normal[0].women[1]}
      </div>
    </label>
  );
};

export default InputForm;
