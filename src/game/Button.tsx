import React, { useState } from 'react';
import { NavLink } from "react-router-dom"
import Board from "./board/Board";
import GlobalContent from "../common/components/GlobalContent";           
import { Button } from 'react-bootstrap';
import { useSessionUser } from '../store/userStore';

export default function ButtonNewGame() {
    const user = useSessionUser()
    const [count, setCount] = useState(-1);

    function NewGame(){
        setCount(count+1)   
        return(<Board />)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    }
    function switchCount(){
        switch(modcount){
            case -1: 
                return '';
            case 0:
                return <Board />;
            case 1:
                return <NewGame />;
        }
    }
    const modcount = count==-1 ? -1 : count%2==0 ? 0 : 1
    const game = switchCount();
    return (
        <GlobalContent>
            <div className="d-flex flex-row">
                <Button className="btn btn-dark mt-2 mx-2" onClick={NewGame}>New Local Game</Button>
                {user ? <NavLink to="/online"><Button className="btn btn-dark mt-2 mx-2">Play Online</Button></NavLink> : ''}
            </div>
             {game}
        </GlobalContent>   
    )
}