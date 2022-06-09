import React, { useState, useEffect } from 'react';
import Square from './Square';
import './Board.css'
import GlobalContent from "../common/components/GlobalContent";
import { Container } from 'react-bootstrap';

export default function BoardOnline() {

    function renderSquare(i:number) {
        return <Square value={i} />;
    }

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
    )
}