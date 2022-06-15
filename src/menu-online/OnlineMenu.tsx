import React, { useEffect } from 'react';
import GlobalContent from "../common/components/GlobalContent"; 
import ListGames from './ListGames';
import { CreateGame, ListIncomplete } from "./gameService"          
import { Button } from 'react-bootstrap';
import { useSessionToken } from "../store/tokenStore"
import { cleanupSessionGames, useSessionGames } from '../store/gamesStore';
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { useNavigate } from 'react-router-dom';
import DangerLabel from '../common/components/DangerLabel';

export default function OnlineMenu(){
    const token = useSessionToken()
    const games = useSessionGames()
    const history = useNavigate()
    const errorHandler = useErrorHandler()
    

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        if(token==undefined){
            history('/game')
        }
        let awaitlist = async () => {
            try{
                const data = await ListIncomplete();
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
        if (games==undefined){ 
            awaitlist()
        }
    }, []);

    useEffect( () => () => 
        cleanupSessionGames(),
    [] );

    async function Game(){
        await CreateGame({ token: token })
        history('/queue')
    }

    function renderListGames(value:number,player:string){
        return(<ListGames value={value} player={player} />)
    }
    
    return (
        <GlobalContent>
            <div className="d-flex flex-row">
                <div><Button className="ms-2 mt-2 btn btn-dark" onClick={Game}>Create New Online Game</Button></div>
                <div className='ms-5 flex-column col-8'>
                {games==undefined ? '' : games.games.map((game)=>(renderListGames(game.id,game.player1)))}
                <div className='mt-5 col-5 mx-auto'><DangerLabel message={errorHandler.errorMessage} /></div>
                </div>
            </div>            
        </GlobalContent>   
    )
}