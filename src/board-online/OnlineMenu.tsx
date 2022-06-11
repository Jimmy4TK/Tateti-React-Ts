import React, { useState, useEffect } from 'react';
import GlobalContent from "../common/components/GlobalContent"; 
import ListGames from './ListGames';
import { CreateGame, ListIncomplete } from "./boardService"          
import { Button } from 'react-bootstrap';
import { useSessionToken } from "../store/tokenStore"
import { cleanupSessionGames, useSessionGames } from '../store/gamesStore';

export default function OnlineMenu(){
    const token = useSessionToken()
    const games = useSessionGames()

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        games==undefined ? ListIncomplete() : ''
    }, []);

    useEffect( () => () => 
    cleanupSessionGames(),
    [] );

    function Game(){
        CreateGame({ token: token })
    }

    function renderListGames(value:number,player:string){
        return(<ListGames value={value} player={player} />)
    }

    return (
        <GlobalContent>
            <div className="d-flex flex-row">
                <Button className="btn btn-dark mt-2 mx-2 h-50" onClick={Game}>Create New Online Game</Button>
                <div className='ms-5 flex-column col-8'>
                    {games==undefined ? '' : games.games.map((game)=>(renderListGames(game.id,game.player)))}
                </div>
            </div>            
        </GlobalContent>   
    )
}