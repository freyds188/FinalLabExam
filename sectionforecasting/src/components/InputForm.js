// src/components/InputForm.js
import React, { useState } from 'react';
import Papa from 'papaparse';
import { Form, Button, Alert } from 'react-bootstrap';

const InputForm = ({ setData }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setError(''); // Reset error on new file selection
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!file) {
            setError('Please upload a file.');
            return;
        }

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                console.log('Parsed Data:', results.data); // Log the raw parsed data

                // Validate and filter data
                const filteredData = results.data.filter(row => {
                    const isValid = row.semester && row.courseCode && !isNaN(row.students);
                    if (!isValid) {
                        console.warn('Invalid row:', row); // Log invalid rows for debugging
                    }
                    return isValid;
                });

                console.log('Filtered Data:', filteredData); // Log the filtered data

                if (filteredData.length === 0) {
                    setError('No valid data found in the file. Please ensure it has the correct format.');
                } else {
                    setData(filteredData);
                    setError(''); // Reset error if data is valid
                }
            },
            error: (err) => {
                setError(`Error parsing file: ${err.message}`);
            },
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Upload Historical Enrollment Data (CSV)</Form.Label>
                <Form.Control 
                    type="file" 
                    accept=".csv" 
                    onChange={handleFileChange} 
                />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button type="submit">Upload</Button>
        </Form>
    );
};

export default InputForm;