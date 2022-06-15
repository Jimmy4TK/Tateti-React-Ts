import React, { useEffect } from 'react';
import './Winscreen.css'
import GlobalContent from "../common/components/GlobalContent";
import { useNavigate } from 'react-router-dom';


export default function WinScreen(props:any){
    let value:string;
    const history = useNavigate()


    useEffect(()=>{
        setTimeout(()=>history('/online'),8000)
    });

    return(
    <GlobalContent>
            {props.value=='winred' ? <div className="background"><div className="winscreen">Red Team Won</div></div> : props.value ? <div className="background"><div className="winscreen">Green Team Won</div></div> : <div className="background"><div className="winscreen">Tie</div></div>}
    </GlobalContent>
    )
}