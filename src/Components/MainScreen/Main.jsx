import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MainForm from "./MainFrom/MainForm";

const MainScreen = () => {
  return (
    <>
      <Container style={Style}>
        <Row>
          <Col xs={12} md={4}>
            <div style={Text}>
              Привіт! <br /> Якщо сумніваєшся у стані свого здоров’я;
              <br /> Якщо не впевнений, що твоє харчування іде тобі на користь;{" "}
              <br />
              Якщо хочеш перевірити, наскільки показники твоїх аналізів є
              хорошими для тебе; <br />
              Просто заповни дані показників твоїх лабораторних аналізів і
              перевір, чи немає у тебе дефіцитних станів!
            </div>
          </Col>
          <Col xs={12} md={8}>
            <MainForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MainScreen;

const Style = {
  backgroundColor: "#7f808a",
  color: "#d3d3d4",
  width: "100%",
};

const Text = {
  margin: "1em",
  fontSize: "22px",
};
