import React, { useState,useEffect } from 'react';
import GlobalContent from "../common/components/GlobalContent";   
import { Button } from 'react-bootstrap';
import ListBoard from "./ListBoard"
import { ListIncomplete, Games } from './boardService'        

let listgames:JSX.Element
export function List(games: Games){
    /* games.games.forEach(games => {
        list=<ListBoard value={ games.id }/>
    }); */
    listgames=<ListBoard value={ games.games[0].id }/>
}

export default function ListGames(){
    const[list,setList]=useState()

    useEffect(() => {    
        ListIncomplete()
        setList(listgames)
    });

    return (
        <GlobalContent>
            <Button onClick={ListIncomplete}></Button>
            {list}
        </GlobalContent>
    )
}