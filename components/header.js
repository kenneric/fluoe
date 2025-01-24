import React from 'react';
import colorTheme from '../colorTheme';

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

const logoStyle = {
    fontSize: '4em',
    color: colorTheme.darkGreen,
    fontFamily: 'Concert One',
    paddingLeft: '40px',
    textShadow: `-1px -1px 0 ${colorTheme.black}, 1px -1px 0 ${colorTheme.black}, -1px 1px 0 ${colorTheme.black}, 1px 1px 0 ${colorTheme.black}`,
    margin: '0px',
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

const selected = {
    textDecoration: 'underline',
    color: 'inherit',
    fontWeight: 300,
};

export default function Header() {
    return (
        <header style={headerStyle}>
            <h1 style={logoStyle}>
                <a style={linkStyle} href="/">
                    Fluoe
                </a>
            </h1>
            <div style={navStyle}>
                <a style={linkStyle} href="/">
                    Home
                </a>
                <a style={linkStyle} href="/tests">
                    Tests
                </a>
                <a style={linkStyle} href="/results">
                    Results
                </a>
                <a style={linkStyle} href="/create">
                    Create
                </a>
            </div>
        </header>
    );
}
