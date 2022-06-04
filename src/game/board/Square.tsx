/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect } from 'react';
import WinScreen from '../Winscreen';
import './Board.css'
import GlobalContent from "../../common/components/GlobalContent";
        
let team:boolean =true;
let w = new Array(8);
let cw:boolean = true;
let check:number=0;

export default function Square(props: any) {
    let value:number;
    let libre:boolean = true;

    const [background, setBackground] = useState("white");
    const [usable, setUsable] = useState(0);
    
    useEffect(() => {
        if(cw){
        usable!=0 ? libre=false : ''
        usable==1 ? setBackground("red") : ''
        usable==2 ? setBackground("green") : ''
        }
    });
    useEffect(() => {
        return () => {
            check=0;
            cw=true
            w=[0,0,0,0,0,0,0,0,0]
        };
    }, []);
    function switchteam(){
        team ? setUsable(1) : setUsable(2)

        team ? (w[props.value]=1,team=false) : (w[props.value]=2,team=true)
    }
    function win(){
        if ((w[0]==w[props.value] && w[1]==w[props.value] && w[2]==w[props.value]) || (w[3]==w[props.value] && w[4]==w[props.value] && w[5]==w[props.value]) || (w[6]==w[props.value] && w[7]==w[props.value] && w[8]==w[props.value]) || (w[0]==w[props.value] && w[3]==w[props.value] && w[6]==w[props.value]) || (w[1]==w[props.value] && w[4]==w[props.value] && w[7]==w[props.value]) || (w[2]==w[props.value] && w[5]==w[props.value] && w[8]==w[props.value]) || (w[0]==w[props.value] && w[4]==w[props.value] && w[8]==w[props.value]) || (w[2]==w[props.value] && w[4]==w[props.value] && w[6]==w[props.value])){
            w[props.value]==1 ? (setBackground("red")) : (setBackground("green"))
            cw=false
        }
        check+=1
        check==9&&cw ? (w[props.value]=3,cw=false,team ? setBackground("green") : setBackground("red")) : ''
    }
    function action(){
        if(cw){
            switchteam()
            win()
        }
    }
    return (
        <GlobalContent>
            {cw ? '' : w[props.value]==1 ? <WinScreen value={1} /> : w[props.value]==2 ? <WinScreen value={2} /> : <WinScreen value={3} />}
            <button className="square" id={background} onClick={function() {libre ? action() : libre}}></button>
        </GlobalContent>
    )
}