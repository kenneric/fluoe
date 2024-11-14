import express from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from './createEmotionCache';
import App from './App';
import theme from './theme';
import cypress from 'cypress';
import { exec } from 'node:child_process';

function renderFullPage(html, css) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Fluoe</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        <meta name="emotion-insertion-point" content="" />
        ${css}
      </head>
      <body>
        <script async src="build/bundle.js"></script>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}

function handleRender(req, res) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>,
  );

  // Grab the CSS from emotion
  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, emotionCss));
}

const app = express();

app.use('/build', express.static('build'));
app.use('/results', express.static(__dirname + '/cypress/reports/html'));

app.post('/v1', (req, res) => {
  cypress.run({
    spec: 'cypress/e2e/2-advanced-examples/aliasing.cy.js',
    reporter: 'cypress-mochawesome-reporter',
    browser: 'chrome',
    config: {
      baseUrl: 'http://localhost:3000',
      video: false,
    },
    env: {
    },
  }).then(() => {
    res.status(200).send();
  });
});

let cypressChild = null;
let cypressOutput = '';
let cypressIsRunning = false;

let progress = ['started', 'running tests', 'complete'];

app.post('/v2', (req, res) => {
  if (!cypressIsRunning) {
    cypressIsRunning = true;
    cypressOutput = '';

    cypressChild = exec('NO_COLOR=1 cypress run --spec cypress/e2e/2-advanced-examples/aliasing.cy.js --reporter cypress-mochawesome-reporter');
    cypressChild.stdout.setEncoding('utf8');
    cypressChild.stdout.on('data', function (data) {
      cypressOutput += data;
    });
    cypressChild.on('close', function (code) {
      cypressIsRunning = false;
    });
    res.status(200).send();
  }
  else {
    res.status(400).send();
  }
});

app.get('/test/progress', (req, res) => {
  res.json({ output: cypressOutput, progressLevel: 0, inProgress: cypressIsRunning });
});

// This is fired every time the server-side receives a request.
app.use(handleRender);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
