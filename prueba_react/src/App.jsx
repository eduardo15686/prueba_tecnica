import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormChat from "./components/FormChat";
import { ApolloProvider } from "@apollo/client";
import client from "./ApolloClient";
import Users from './Users';

function App() {
  return (
    <ApolloProvider client={client}>
      <Container>
        <Row>
          <Col className="scrollable-col" xs={12} md={7}>
            <div className="content">
              <FormChat />
            </div>
          </Col>
          <Col className="bg-color-2" xs={12} md={5}>
          <Users />
          </Col>
        </Row>
      </Container>
    </ApolloProvider>
  );
}

export default App;
