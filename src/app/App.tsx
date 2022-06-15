import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Welcome from "../welcome/Welcome";
import LoginMenu from '../menu/LoginMenu';
import NavBarMenu from "../menu/Navbar";
import Info from '../info/Info'
import Password from '../user/Password';
import ButtonNewGame from '../game/Button';
import OnlineMenu from '../menu-online/OnlineMenu';
import Queue from '../menu-online/Queue';
import BoardOnline from '../board-online/Board';
import { StateLoggedInRoute } from '../common/components/LoggedInRoute';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <BrowserRouter>
              <NavBarMenu />
              <Routes>    
                <Route path="/" element={<Welcome />} />
                <Route path="/game" element={<ButtonNewGame />} />
                <Route path="/login" element={<LoginMenu />} />
                <Route path="/register" element={<LoginMenu />} />
                <Route path="/info" element={<StateLoggedInRoute component={Info} />} />
                <Route path="/password" element={<StateLoggedInRoute component={Password} />} />
                <Route path="/online" element={<OnlineMenu />} />
                <Route path="/queue" element={<Queue />} />
                <Route path="/gameonline" element={<BoardOnline />} />
              </Routes>
      <Outlet />
    </BrowserRouter >
  );
}

