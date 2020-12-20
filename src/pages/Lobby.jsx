import React from 'react'
import { useParams } from "react-router-dom";

const Lobby = () => {
    const { name } = useParams();
    return (
        <div>
            <h1> Waiting for players ...</h1>
        </div>
    )
}

export default Lobby
