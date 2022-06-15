import React, { useState, useEffect } from 'react';
import GlobalContent from "../common/components/GlobalContent";
import { Game, Update } from '../menu-online/boardService';
import { useSessionGame } from '../store/gameStore';
import './Winscreen.css'
import './Board.css'

export default function Square(props: any) {
    let value:number;
    let team:boolean;
    let game=useSessionGame();
    let posarray = game!.pos.split(',')

    const [background, setBackground] = useState("white");

    useEffect(() => {
        checkPos()
    });

    function Action(){
        props.team ? setBackground("red") : setBackground("green")
        Update(game!.id,{game:{pos: posarray.join(',')},position:props.value})
    }

    function Turn(){
        if(posarray[props.value]=='0'){
            console.log(props.team)
            console.log(game?.team)
            if(props.team==game?.team && game?.state=='ingame'){
                return true
            } else{
                return false
            }
        }
    }

    function checkPos(){
        if(posarray[props.value]=='1'){
            setBackground("red")
        } else if(posarray[props.value]=='2') {
            setBackground('green')
        }
    }

    return (
        <GlobalContent>
            <button className="square" id={background} onClick={function() {Turn() ? Action() : <div></div>}}></button>
        </GlobalContent>
    )
}