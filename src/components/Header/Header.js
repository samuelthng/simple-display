import React from "react";
import Col from "antd/es/col";
import Row from "antd/es/row";
import Typography from "antd/es/typography";
const Header = ({ title }) => {
  return (
    <Row align="middle" style={{ height: "100%" }}>
      <Col>
        <Typography.Title style={{ color: "#eee", marginBottom: 0 }}>
          {title}
        </Typography.Title>
      </Col>
    </Row>
  );
};

export default Header;
