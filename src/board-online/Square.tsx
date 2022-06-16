import React, { useState, useEffect } from 'react';
import GlobalContent from "../common/components/GlobalContent";
import { Update } from '../menu-online/gameService';
import { useSessionGame } from '../store/gameStore';
import './Winscreen.css'
import './Board.css'

export default function Square(props: any) {
    let value:number;
    let turn:boolean;
    let game=useSessionGame();
    let board1 = game!.board1.split('')
    let board2 = game!.board2.split('')

    const [background, setBackground] = useState("white");

    useEffect(() => {
        checkPos()
    });

    function Action(){
        Update(game!.id,{pos:props.value})
    }

    function Turn(){
        if(props.turn==game?.turn){
            if(!board1.includes(props.value.toString())){
                if(!board2.includes(props.value.toString())){
                    return true
                } else{
                    return false
                }
            }
        } else {
            return false
        }
    }

    function checkPos(){
        if(board1.includes(props.value.toString())){
            setBackground("red")
        } else if(board2.includes(props.value.toString())) {
            setBackground('green')
        }
    }

    return (
        <GlobalContent>
            <button className="square" id={background} onClick={function() {Turn() ? Action() : <div></div>}}></button>
        </GlobalContent>
    )
}