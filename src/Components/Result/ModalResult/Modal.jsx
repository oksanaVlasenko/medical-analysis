import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { ItemContext } from "../../Context/Context";
import Error from "../404/404";
import "./style.css";

const ModalResult = () => {
  const item = useContext(ItemContext);
  const msg = "Ваші аналізи в нормі!";
  if (!item.result || item.result.length === 0) {
    return <Error msg={msg} />;
  }

  return (
    <>
      <div>
        {item.result.map((item, index) => {
          return (
            <Modal.Dialog key={index}>
              <Modal.Body style={{ textAlign: "center", fontSize: "20px" }}>
                {item}
              </Modal.Body>
            </Modal.Dialog>
          );
        })}
      </div>
      <div>
        <Modal.Dialog>
          <Modal.Body>
            <h4>Показники нижче норми</h4>
            <ul style={StyleList}>
              {item.analysis.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
            </ul>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </>
  );
};

export default ModalResult;

const StyleList = {
  listStyleType: "none",
  fontSize: "20px",
};
