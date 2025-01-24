import express from 'express'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import App from './App'
import { exec } from 'node:child_process'
import { MongoClient } from 'mongodb'
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
// Database Name
const dbName = 'data'

function renderFullPage(html) {
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
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Concert+One&display=swap" 
        />
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Asap:ital,wght@0,100..900;1,100..900&display=swap" 
        />
      </head>
      <body style="margin: 0px; padding: 0px; background: #C0CCCA; overflow-x:hidden">
        <script async src="build/bundle.js"></script>
        <div id="root" style="">${html}</div>
      </body>
    </html>
  `
}

function handleRender(req, res) {
    // Render the component to a string.
    const html = ReactDOMServer.renderToString(<App />)

    // Send the rendered page back to the client.
    res.send(renderFullPage(html))
}

const app = express()

app.use('/build', express.static('build'))
app.use('/results', express.static(__dirname + '/cypress/reports/html'))

let status = ['waiting', 'started', 'running', 'completed', 'stopped']
let testStatus = status[0]
let cypressChild = null
let cypressOutput = ''
let exitCode = ''
const controller = new AbortController()
const { signal } = controller

app.post('/test/start', (req, res) => {
    if (testStatus === status[0]) {
        cypressOutput = ''
        testStatus = status[1]

        cypressChild = exec(
            'NO_COLOR=1 cypress run --spec cypress/e2e/2-advanced-examples/actions.cy.js --reporter cypress-mochawesome-reporter',
            { signal },
            (error) => {
                console.error(error) // an AbortError
            }
        )
        cypressChild.stdout.setEncoding('utf8')
        cypressChild.stdout.on('data', function (data) {
            cypressOutput += data
            if (data.includes('✓')) {
                testStatus = status[2]
            }
            if (data.includes('Running')) {
                testStatus = status[2]
            }
        })
        cypressChild.on('close', function (code) {
            testStatus = status[3]
            exitCode = code
        })
        res.status(200).send()
    } else {
        res.status(400).send()
    }
})

app.post('/test/abort', (req, res) => {
    if (['started', 'running'].includes(testStatus)) {
        testStatus = 'stopped'
        exitCode = 1
        controller.abort()
        res.status(200).send()
    } else {
        res.status(400).send()
    }
})

app.get('/test/progress', (req, res) => {
    res.json({
        output: cypressOutput,
        testStatus: testStatus,
        exitCode: exitCode,
    })
})

app.use(express.json())

app.post('/db', async (req, res) => {
    console.log(req.body.testName)
    // Use connect method to connect to the server
    await client.connect()
    console.log('Connected successfully to server')
    const db = client.db(dbName)
    const collection = db.collection('pages')

    res.status(200).send()
})

// This is fired every time the server-side receives a request.
app.use(handleRender)

const port = 3000
app.listen(port, () => {
    console.log(`Listening on ${port}`)
})
