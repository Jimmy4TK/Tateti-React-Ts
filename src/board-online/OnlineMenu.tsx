import React, { useState } from 'react';
import ListGames from './ListGames'
import GlobalContent from "../common/components/GlobalContent"; 
import BoardOnline from "./Board"
import { CreateGame } from "./boardService"          
import { Button } from 'react-bootstrap';
import {useSessionToken} from "../store/tokenStore"

export interface Game {
    id: number
    pos: Array<string> 
    team: boolean
}

export default function OnlineMenu(){
    const[token, setToken] = useState(useSessionToken())
    const[count,setCount] = useState(0)
    const board = count==0 ? <div></div> : <BoardOnline />

    function Game(){
        CreateGame({ token: token })
        setCount(count+1)
    }

    return (
        <GlobalContent>
            <div className="d-flex flex-row">
                <Button className="btn btn-dark mt-2 mx-2" onClick={Game}>Create New Online Game</Button>
            </div>
            <ListGames />
            {board}
        </GlobalContent>   
    )
}