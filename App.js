import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from './ProTip';
import Link from '@mui/material/Link';

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

function launchTests() {
  // Send data to the backend via POST
  fetch('/test', {  // Enter your IP address here
    method: 'POST',
    mode: 'cors',
    // body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
  }).then(response => {
    if (response.status === 200) {
      window.location.href = '/results/';
    }
  })
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Fluoe - Tailored Test Automation
        </Typography>
        <div onClick={launchTests} style={{
          textAlign: 'center',
          width: '200px',
          border: '1px solid gray',
          cursor: 'pointer',
          borderRadius: '5px'
        }}>
          Start tests
        </div>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
