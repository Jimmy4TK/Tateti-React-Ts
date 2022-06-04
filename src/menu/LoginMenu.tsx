import React from "react"
import { Container } from "react-bootstrap"
import Login from "../user/Login"
import Register from "../user/Register"
import Sidebar from "./Sidebar"

export default function LoginMenu() {
    const menu = () => { switch(window.location.pathname) {

        case "/register":   return <Register />;
        case "/login":   return <Login />;
    }}
    return (
        <div className="d-flex flex-row">
            <Sidebar />
            <Container>{ menu() }</Container>
        </div>
    )
}