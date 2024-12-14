import React from 'react';
import TestBlock from './TestBlock';
import colorTheme from './colorTheme';

const appStyle = {
  height: '100%',
  width: '100%',
  fontFamily: 'Roboto',
  color: colorTheme.white,
  fontSize: '1.5em',
}

const headerStyle = {
  width: '100%',
  fontSize: '3em',
  color: colorTheme.orange,
  textShadow: '0 0 3px #000',
  paddingLeft: '40px'
}

const tests = [
  {
    name: "Test 1",
  }
];

export default function App() {
  return (
    <div style={appStyle}>
      <div >
        <h1 style={headerStyle}>
          Fluoe
        </h1>
        <TestBlock />
      </div>
    </div>
  );
}
