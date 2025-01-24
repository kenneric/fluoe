import React, { useState } from 'react';

const newTestHeader = {
    fontSize: '1.3em',
    fontWeight: 300,
};

export default function CreateNewTestPage() {
    const [testName, setTestName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = JSON.stringify({
            testName,
        });

        setTestName('');

        fetch('/db', {
            method: 'POST',
            body: requestBody,
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 style={newTestHeader}>Create New Test</h3>
            <label>Name</label>
            <input
                id="testName"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
            ></input>
        </form>
    );
}
