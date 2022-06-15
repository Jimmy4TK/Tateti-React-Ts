import React from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSessionToken } from '../store/tokenStore';
import { AssignPlayer } from './gameService';
import "./ListGames.css"

export default function ListGames(props:any){
    const token = useSessionToken()
    
    let value:number
    let player:string

    function Enter(){
        AssignPlayer(props.value,{token: token})
    }

    return (
        <div className='ms-5 h-50'>
            <Table striped bordered hover variant="dark" className='mt-2 h-100'>
                <thead className='align-middle'>
                    <tr>
                        <th><Container className='position-relative ms-2'><NavLink to="/queue"><Button className="btn-light enter ms-5 mb-2" onClick={Enter}>Enter</Button></NavLink>
                            <span className='start'>Game:</span> <span className='start ms-5'>id:{props.value}</span>                            
                            <span /*40 caracteres el player */className='players'>player: {props.player}</span></Container></th>
                    </tr>
                </thead>
            </Table>
        </div>
    )
}