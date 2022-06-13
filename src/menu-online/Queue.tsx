import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Button, Container, Modal, Table } from 'react-bootstrap';
import GlobalContent from '../common/components/GlobalContent';
import { useSessionGame } from '../store/gameStore';
import { Game } from './boardService';

export default function Queue(props:any){
    const[count,setCount] = useState(1);
    const [show, setShow] = useState(false);
    const history = useNavigate()
    let game = useSessionGame()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if(game?.state=='ingame'){
            setTimeout(()=>history('/gameonline'),3000)
        }
        if(count!=0){
            setTimeout(async ()=>{
                if(game==undefined){
                    handleShow()
                }else{
                    if(game.state=='waitingplayer'){
                        game= await Game(game.id);
                        setCount(count+1)
                    } else if(game.state=='ingame'){
                        setCount(0)
                    }
                }
            },3000)
        }
    });

    function switchState(){
        switch (game?.state) {
            case 'waitingplayer':
                return 'Waiting player'
            case 'ingame':
                return 'In Game'
            default:
                break;
        }
    }

    const state=switchState();

    return(
        <GlobalContent>
            <Container className="mt-5">
                <Table striped bordered hover variant="secondary">
                    <thead>
                        <tr>
                            <th>Game id: {game?.id}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>State: {state}</td>
                        </tr>
                        <tr>
                            <td>First player: {game?.player1}</td>
                        </tr>
                        <tr>
                            <td>Second player: {game?.player2}</td>
                        </tr>
                    </tbody>
                </Table>
                
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                <Modal.Title>Game not founded</Modal.Title>
                </Modal.Header>
                <Modal.Body>Game not found, redirecting to online games</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>history('/online')}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </GlobalContent>
    )
}