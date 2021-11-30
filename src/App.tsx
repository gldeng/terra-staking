import { AppBar, Box, Switch, Toolbar } from "@mui/material";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Staking from "./Staking";
import Unstaking from "./Unstaking";
import Wallet from "./Wallet";
import Logo from './assets/rockx_logo.3b324084.png';
function App() {
  return (
    <>
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
      <Router>
        <Wallet />
        {/* <Routes>
        <Route path='/' element={<Staking />}/>
              <Route path='unstake' element={<Unstaking />} /> */}
        {/* <Route path={'/'} element={<Wallet/>} /> */}
        {/* <Redirect from={'/'} to={'/w'} /> */}
        {/* </Routes> */}
      </Router>
    </>
  );
}

export default App;
