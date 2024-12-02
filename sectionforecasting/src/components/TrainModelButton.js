// src/components/TrainModelButton.js
import React, { useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Button, Alert } from 'react-bootstrap';

const TrainModelButton = ({ data, setPredictions, maxStudents }) => {
  const modelRef = useRef(null); // Use a ref to hold the model instance

  const createModel = () => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [1] }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1 }));

    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
    return model;
  };

  const trainModel = async () => {
    try {
      // Create the model only if it doesn't exist
      if (!modelRef.current) {
        modelRef.current = createModel();
      }

      // Normalize the input data
      const maxEnrollment = Math.max(...data.map(item => item.students));
      const xs = data.map(item => item.students / maxEnrollment); // Normalize input
      const ys = data.map(item => item.students / maxEnrollment); // Normalize target

      const xsTensor = tf.tensor2d(xs, [xs.length, 1]);
      const ysTensor = tf.tensor2d(ys, [ys.length, 1]);

      // Train the model
      await modelRef.current.fit(xsTensor, ysTensor, { epochs: 200 });

      // Make predictions
      const predictions = data.map((item, index) => {
        const normalizedInput = xs[index];
        const predictedEnrollment = modelRef.current.predict(tf.tensor2d([normalizedInput], [1, 1])).arraySync()[0][0];
        const roundedEnrollment = Math.round(predictedEnrollment * maxEnrollment); // Denormalize
        const predictedSections = Math.ceil(roundedEnrollment / maxStudents); // Calculate sections

        return {
          courseCode: item.courseCode, // Include course code in the prediction
          predictedEnrollment: roundedEnrollment,
          predictedSections: predictedSections,
        };
      });

      setPredictions(predictions);
    } catch (error) {
      console.error('Error during model training:', error);
      alert(`Error during model training: ${error.message}`);
    }
  };

  return <Button onClick={trainModel}>Train Model</Button>;
};

export default TrainModelButton;