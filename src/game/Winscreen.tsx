import React from 'react';
import './Winscreen.css'
import GlobalContent from "../common/components/GlobalContent";


export default function WinScreen(props:any){
    let value:number;

    return(
    <GlobalContent>
            {props.value==1 ? <div className="background"><div className="winscreen">Gana equipo rojo</div></div> : props.value==2 ? <div className="background"><div className="winscreen">Gana equipo verde</div></div> : <div className="background"><div className="winscreen">Empate</div></div>}
    </GlobalContent>
    )
}