import React, { useState, useEffect } from 'react';
import GlobalContent from "../common/components/GlobalContent";
import { Button, Container, Modal } from 'react-bootstrap';
import { useSessionUser } from '../store/userStore';
import { Game } from '../menu-online/gameService';
import { useSessionGame } from '../store/gameStore';
import { useNavigate } from 'react-router-dom';
import Square from './Square';
import './Board.css'
import WinScreen from './Winscreen';

export default function BoardOnline() {
    let game=useSessionGame()
    let user=useSessionUser()
    let turn:boolean
    const history = useNavigate()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if(user!.name==game?.player1){
        turn= true;
    } else if(user!.name==game?.player2){
        turn= false;
    }

    const[count,setCount] = useState(1);
    

    function renderSquare(i:number) {
        return <Square value={i} turn={turn} game={game} />;
    }

    useEffect(() => {
        if(game==undefined){
            handleShow()
        }
        if(count!=0){
            setTimeout(async ()=>{
                if(turn!=game?.turn){
                    if(game?.state=='ingame'){
                        game= await Game(game!.id);
                        setCount(count+1)
                    }
                } else {
                    setCount(0)
                }
            },5000)
        } else {
            setTimeout(()=>setCount(1),5000)
        }
    });

    if(game==undefined){
        return (
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
        )
    } else if(game?.state!='ingame'){
        return(<WinScreen value={game?.state} />)
    } else {
    return (
        <GlobalContent>
            <Container className="mx-auto tabla">
            <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </Container>
        </GlobalContent>   
    )}
}
