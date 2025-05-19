import React from "react";
import { Card, Typography, Row, Col } from "antd";
import { ArrowUpOutlined, ReloadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const CurrencyCard = () => {
  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 20,
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
        // width: 300,
        position: "relative",
      }}
    >
      <ReloadOutlined style={{ position: "absolute", top: 16, right: 16, color: "#bbb" }} />
      <Row align="middle" gutter={8}>
        <Col>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 18,
            }}
          >
            🇮🇳
          </div>
        </Col>
        <Col>
          <Text strong style={{ fontSize: 16, color: "#555" }}>
            INR
          </Text>
        </Col>
      </Row>

      <Title level={2} style={{ margin: "16px 0", fontWeight: 700, color: "#333" }}>
        255,677.56
      </Title>

      <Row align="middle" gutter={8}>
        <Col>
          <Text style={{ color: "green", fontWeight: 500 }}>
            15% <ArrowUpOutlined />
          </Text>
        </Col>
        <Col>
          <Text style={{ color: "#888" }}>Since last month</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default CurrencyCard;
