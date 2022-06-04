import React, { useState } from 'react';
import Board from "./board/Board";
import BoardOnline from "./board-online/Board"
import GlobalContent from "../common/components/GlobalContent";           
import { Button } from 'react-bootstrap';

export default function ButtonNewGame() {
    const [count, setCount] = useState(0);
    const [online,setOnline] = useState(0);

    function NewGame(){
        setCount(count+1)   
        return(<Board />)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    }
    function NewGameOnline(){
        setOnline(1)   
        return(<Board />)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    }
    const game = online ? <BoardOnline /> : count%2==0 ? <Board /> : <NewGame />
    return (
        <GlobalContent>
            <div className="d-flex flex-row">
                <Button className="btn btn-dark mt-2 mx-2" onClick={NewGame}>New Local Game</Button>
                <Button className="btn btn-dark mt-2 mx-2" onClick={NewGameOnline}>Play Online</Button>
            </div>
             {game}
        </GlobalContent>   
    )
}