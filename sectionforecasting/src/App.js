// src/App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputForm from './components/InputForm';
import TrainModelButton from './components/TrainModelButton';
import PredictionTable from './components/PredictionTable';
import PredictionChart from './components/PredictionChart';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const App = () => {
  const [data, setData] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [maxStudents, setMaxStudents] = useState(30);

  const handleMaxStudentsChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10)); // Ensure minimum value is 1
    setMaxStudents(value);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center">Course Section Forecasting System</h1>
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <InputForm setData={setData} />
          <Form.Group className="mt-3">

          </Form.Group>
          <Button 
            variant="primary" 
            className="mt-3" 
            onClick={() => setPredictions([])} // Optional: Reset predictions on new data input
          >
            Reset Predictions
          </Button>
          <TrainModelButton data={data} setPredictions={setPredictions} maxStudents={maxStudents} />
        </Col>
      </Row>
      {predictions.length > 0 && (
        <>
          <Row>
            <Col md={6} className="mx-auto">
              <PredictionTable predictions={predictions} />
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mx-auto">
              <PredictionChart predictions={predictions} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default App;