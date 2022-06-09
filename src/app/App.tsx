import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Welcome from "../welcome/Welcome";
import ButtonNewGame from '../game/Button';
import LoginMenu from '../menu/LoginMenu';
import OnlineMenu from '../board-online/OnlineMenu';
import { StateLoggedInRoute } from '../common/components/LoggedInRoute';
import Info from '../info/Info'
import Password from '../user/Password';
import NavBarMenu from "../menu/Navbar";
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
              </Routes>
      <Outlet />
    </BrowserRouter >
  );
}

