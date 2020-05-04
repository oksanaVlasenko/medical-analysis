import React, { useContext } from "react";
import { ItemContext } from "../../Context/Context";
import Container from "react-bootstrap/Container";
import Error from "../404/404";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormResult from "../FormResult/FormResult";

const MainResult = () => {
  const msg = "Будь ласка, оберіть список аналізів";
  const item = useContext(ItemContext);
  console.log(item.items);
  if (item.items === null) {
    return <Error msg={msg} />;
  }
  return (
    <Container style={Forms}>
      <Row>
        <Col xs={12} md={8} lg={8}>
          <FormResult />
        </Col>
        <Col xs={12} md={4} lg={4}>
          <p style={Text}>
            Якщо у тебе виявились можливі дефіцити, не займайся самолікуванням,
            обо’язково звернись до лікаря!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default MainResult;

const Forms = {
  height: "100%",
};

const Text = {
  margin: "1em",
  fontSize: "22px",
  color: "#d3d3d4",
};
