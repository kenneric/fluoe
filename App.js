import React, { useState } from 'react';
import TestProgress from './TestProgress';

export default function App() {
  function launchTests() {
    setTestStarted(true);
    fetch('/test/start', {
      method: 'POST',
      mode: 'cors',
    });
  }

  function abortTests() {
    setTestStarted(false);
    fetch('/test/abort', {
      method: 'POST',
      mode: 'cors',
    });
  }

  const [testStarted, setTestStarted] = useState(false);

  return (
    <div style={{ margin: '20px' }}>
      <div>
        <h1>
          Fluoe - Tailored Test Automation
        </h1>
        <button onClick={launchTests} style={{
          textAlign: 'center',
          width: '100px',
          cursor: 'pointer',
          borderRadius: '3px'
        }}>
          Start
        </button>
        <button onClick={abortTests} style={{
          textAlign: 'center',
          width: '100px',
          cursor: 'pointer',
          borderRadius: '3px'
        }}>
          Abort
        </button>
        <TestProgress/>
        <div />
        <div />
      </div>
    </div>
  );
}
