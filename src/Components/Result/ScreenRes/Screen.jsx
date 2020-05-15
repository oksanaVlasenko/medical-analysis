import React, { useContext } from "react";
import { ItemContext } from "../../Context/Context";
import Container from "react-bootstrap/Container";
import Error from "../404/404";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModalResult from "../ModalResult/Modal";
import { useHistory } from "react-router-dom";

const Screen = () => {
  let history = useHistory();
  const item = useContext(ItemContext);
  const msg = "Ваші аналізи в нормі!";
  if (!item.result) {
    return <Error msg={msg} />;
  }
  return (
    <Container style={Forms}>
      <Row>
        <Col xs={12} md={8} lg={8}>
          <ModalResult />
        </Col>
        <Col
          xs={12}
          md={4}
          lg={4}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <p style={Text}>
            Якщо у тебе виявились можливі дефіцити, не займайся самолікуванням,
            обо’язково звернись до лікаря!
          </p>
          <div>
            <button
              className="button-err"
              onClick={() => {
                history.push("/");
              }}
            >
              Заново
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Screen;

const Forms = {
  height: "100%",
};

const Text = {
  margin: "1em",
  fontSize: "22px",
  color: "#d3d3d4",
};
