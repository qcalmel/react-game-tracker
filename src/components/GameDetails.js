import * as React from "react";
import { useNavigate } from "react-router-dom";

const GameDetails = ({gameID}) => {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(-1)}>Go back</button>
    )
}

export default GameDetails