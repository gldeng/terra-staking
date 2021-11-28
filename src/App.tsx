import { Switch } from "@mui/material";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Staking from "./Staking";
import Unstaking from "./Unstaking";
import Wallet from "./Wallet";

function App() {
  return (
    <Router>
      <Wallet/>
      {/* <Routes>
      <Route path='/' element={<Staking />}/>
            <Route path='unstake' element={<Unstaking />} /> */}
        {/* <Route path={'/'} element={<Wallet/>} /> */}
        {/* <Redirect from={'/'} to={'/w'} /> */}
      {/* </Routes> */}
    </Router>
  );
}

export default App;
