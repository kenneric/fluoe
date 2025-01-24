import React, { useState } from 'react';
import TestBlock from './TestBlock';
import colorTheme from './colorTheme';

const appStyle = {
    height: '100%',
    width: '100%',
    color: colorTheme.black,
    fontSize: '1.5em',
    fontFamily: 'Asap',
    fontWeight: 300,
};

const logoStyle = {
    fontSize: '4em',
    color: colorTheme.darkGreen,
    fontFamily: 'Concert One',
    paddingLeft: '40px',
    textShadow: `-1px -1px 0 ${colorTheme.black}, 1px -1px 0 ${colorTheme.black}, -1px 1px 0 ${colorTheme.black}, 1px 1px 0 ${colorTheme.black}`,
    margin: '0px',
};

const newTestHeader = {
    fontSize: '1.3em',
    fontWeight: 300,
};

const headerStyle = {
    width: '100vw',
    height: '100px',
    background: colorTheme.white,
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottom: `1px solid ${colorTheme.black}`,
};

const navStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
};

const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
};

const mainPageStyle = {
    marginTop: '80px',
};

const selected = {
    textDecoration: 'underline',
    color: 'inherit',
    fontWeight: 300,
};

export default function App() {
    const [testName, setTestName] = useState('');

    function handleSubmit(event) {
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
    }

    return (
        <div style={appStyle}>
            <header style={headerStyle}>
                <h1 style={logoStyle}>Fluoe</h1>
                <div style={navStyle}>
                    <a style={linkStyle} href="/">
                        Home
                    </a>
                    <a style={linkStyle} href="/">
                        Create
                    </a>
                    <a style={{ ...linkStyle, ...selected }} href="/">
                        Tests
                    </a>
                    <a style={linkStyle} href="/">
                        Results
                    </a>
                </div>
            </header>
            <div style={mainPageStyle}>
                <TestBlock />
                <TestBlock />
                <TestBlock />
                <form onSubmit={handleSubmit}>
                    <h3 style={newTestHeader}>Create New Test</h3>
                    <label>Name</label>
                    <input
                        id="testName"
                        value={testName}
                        onChange={(e) => setTestName(e.target.value)}
                    ></input>
                </form>
            </div>
        </div>
    );
}
