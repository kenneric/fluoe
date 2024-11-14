import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from './ProTip';
import Link from '@mui/material/Link';
import TestProgress from './TestProgress';

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © '}
      <Link color="inherit" href="/">
        Fluoe
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  const [showTestRun, setShowTestRun] = useState(false);

  function launchTestsV1() {
    setShowTestRun(true);
    // Send data to the backend via POST
    fetch('/v1', {  // Enter your IP address here
      method: 'POST',
      mode: 'cors',
      // body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    }).then(response => {
      if (response.status === 200) {
        window.location.href = '/results/';
      }
    })
  }

  function launchTestsV2() {
    setShowTestRun(true);
    fetch('/v2', {
      method: 'POST',
      mode: 'cors',
    });
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Fluoe - Tailored Test Automation
        </Typography>
        <div onClick={launchTestsV1} style={{
          textAlign: 'center',
          width: '200px',
          border: '1px solid gray',
          cursor: 'pointer',
          borderRadius: '5px'
        }}>
          Start tests v1
        </div>
        <div onClick={launchTestsV2} style={{
          textAlign: 'center',
          width: '200px',
          border: '1px solid gray',
          cursor: 'pointer',
          borderRadius: '5px'
        }}>
          Start tests v2
        </div>
        {showTestRun && <TestProgress />}
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
