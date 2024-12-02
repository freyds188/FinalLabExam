// src/components/PredictionTable.js
import React from 'react';
import { Table } from 'react-bootstrap';

const PredictionTable = ({ predictions }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Course Code</th>
          <th>Predicted Enrollment</th>
          <th>Predicted Sections</th>
        </tr>
      </thead>
      <tbody>
        {predictions.length > 0 ? (
          predictions.map((pred, index) => (
            <tr key={index}>
              <td>{pred.courseCode || `Course ${index + 1}`}</td>
              <td>{pred.predictedEnrollment || 0}</td>
              <td>{pred.predictedSections || 0}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="text-center">No predictions available</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default PredictionTable;