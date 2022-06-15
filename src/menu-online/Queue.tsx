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
        if(count!=0){
            setTimeout(actionHandler,3000)
        }
    });

    function actionHandler(){
        if(game==undefined){
            handleShow()
            setCount(0)
        }else{
            if(game.state=='waitingplayer'){
                updatingGame()
                setCount(count+1)
            } else if(game.state=='ingame'){
                history('/gameonline')
                setCount(0)
            }
        }
    }
    
    async function updatingGame(){
        game= await Game(game!.id);
    }

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

    function comeBack(){
        handleClose()
        history('/online')   
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
                <Button variant="secondary" onClick={comeBack}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </GlobalContent>
    )
}