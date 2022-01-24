import * as React from "react";
import {useEffect, useState} from "react";
import {getSingleGame} from "../helpers/api";

const GameDetails = ({gameID, isTracked, onTrack}) => {
    const [game, setGame] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        getSingleGame(gameID)
            .then(res => {
                setGame(res.data[0])
                setIsLoading(false)
            })
    })
    return (
        <>
            {
                isLoading ?
                    (
                        <p>Loading...</p>
                    )
                    :
                    (
                        <div className='game-details'>
                            <div className='game-cover'>
                                <img
                                    src={'//images.igdb.com/igdb/image/upload/t_cover_big/' + game.cover.image_id + '.jpg'}
                                    alt='game cover'/>
                                <input
                                    onClick={() => onTrack(game.id)}
                                    type='button'
                                    value={isTracked ? "Untrack" : "Track"}
                                    className={isTracked ? "btn btn-red" : "btn"}
                                />
                            </div>
                            <div className='game-content'>
                                <h3>{game.name}</h3>
                                <p>Genre : {game.genres?.map((genre,i)=>(game.genres.length -1 === i ? genre.name :
                                    genre.name + ", "))}</p>
                                <p>Platforms : {game.platforms?.map((platform,i)=>(game.platforms.length -1 === i ? platform.name :
                                    platform.name + ", "))}
                                </p>
                            </div>

                        </div>

                    )
            }
        </>
    )
}

export default GameDetails