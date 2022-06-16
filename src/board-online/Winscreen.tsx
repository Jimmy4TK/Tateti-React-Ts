import React, { useEffect } from 'react';
import GlobalContent from "../common/components/GlobalContent";
import { useNavigate } from 'react-router-dom';
import './Winscreen.css'

export default function WinScreen(props:any){
    let value:string;
    const history = useNavigate()


    useEffect(()=>{
        setTimeout(()=>history('/online'),8000)
    });

    return(
    <GlobalContent>
            {props.value=='winplayer1' ? <div className="background"><div className="winscreen">Red Team Won</div></div> : props.value=='winplayer2' ? <div className="background"><div className="winscreen">Green Team Won</div></div> : <div className="background"><div className="winscreen">Draw</div></div>}
    </GlobalContent>
    )
}