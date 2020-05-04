import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { ItemContext } from "../../Context/Context";
import { useHistory } from "react-router-dom";
import "./style.css";

const ModalResult = () => {
  let history = useHistory();
  const item = useContext(ItemContext);

  return (
    <>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title style={{ textAlign: "center" }}>
            {item.result}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4>Показники нижче норми</h4>
          <ul style={StyleList}>
            {item.analysis.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </Modal.Body>
      </Modal.Dialog>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <button
          className="button-err"
          onClick={() => {
            history.push("/");
          }}
        >
          Заново
        </button>
      </div>
    </>
  );
};

export default ModalResult;

const StyleList = {
  listStyleType: "none",
  fontSize: "20px",
};
