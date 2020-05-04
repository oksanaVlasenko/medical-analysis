import React from "react";
import "./style.css";

const Gender = ({ data, gender, change }) => {
  return (
    <div
      style={FormGender}
      className="d-flex flex-row justify-content-around align-items-center"
    >
      <div>
        <label>Стать</label>
      </div>
      <div>
        <input
          className="custom-checkbox male"
          type="radio"
          id={data.male}
          value={data.male}
          checked={data.male === gender}
          onChange={(e) => change(e)}
        />
        <label htmlFor={data.male}></label>
        <input
          className="custom-checkbox female"
          type="radio"
          id={data.female}
          value={data.female}
          checked={data.female === gender}
          onChange={(e) => change(e)}
        />
        <label htmlFor={data.female}></label>
      </div>
    </div>
  );
};

export default Gender;

const FormGender = {
  backgroundColor: "#de9ee9",
  color: "#fff",
  borderRadius: "20px",
  padding: "10px 20px 5px 20px",
  fontSize: "28px",
};
