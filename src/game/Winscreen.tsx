import React from 'react';
import './Winscreen.css'
import GlobalContent from "../common/components/GlobalContent";


export default function WinScreen(props:any){
    let value:number;

    function switchBackground(){
        switch(props.value){
            case 1: 
                return <div className="background"><div className="winscreen">Gana equipo rojo</div></div>;
            case 2:
                return <div className="background"><div className="winscreen">Gana equipo verde</div></div>;
            case 3:
                return <div className="background"><div className="winscreen">Empate</div></div>;
            default:
                return <div></div>;
        }
    }

    const background=switchBackground();

    return(
    <GlobalContent>
            {background}
    </GlobalContent>
    )
}