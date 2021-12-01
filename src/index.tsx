import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppBar, Box, ThemeProvider, Toolbar } from '@mui/material';
import Logo from './assets/rockx_logo.3b324084.png';

import { lightTheme } from "./theme/theme";

ReactDOM.render(
  <ThemeProvider theme={lightTheme}>
    <AppBar position="static" color="transparent">
      <Toolbar disableGutters sx={{ background: "#101c3d" }}>
        <Box
          component="img"
          sx={{
            height: 64,
          }}
          alt="Rock X"
          src={Logo}
        />
      </Toolbar>
    </AppBar>
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
