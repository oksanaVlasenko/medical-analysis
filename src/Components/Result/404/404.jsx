import React from "react";
import { useHistory } from "react-router-dom";
import "./style.css";

const Error = ({ msg }) => {
  let history = useHistory();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center error">
      <h1>{msg}</h1>
      <h3>Дякуємо за розуміння!</h3>

      <button
        className="button-err"
        onClick={() => {
          history.push("/");
        }}
      >
        На головну
      </button>
    </div>
  );
};

export default Error;
