import {useState} from "react";
import GameDetails from "./GameDetails";

const GameList = ({games, trackedGameID, onTrack}) => {
    const [expandedGame, setExpandedGame] = useState('')
    const handleRowClick = (id) => {
        if (id === expandedGame)
            setExpandedGame('')
        else
            setExpandedGame(id)
    }

    const isTrackedGame = (id) => {
        if (trackedGameID)
            return trackedGameID?.some((trackedGameId) => trackedGameId === id)
        return true
    }
    return (
        <table className="styled-table">
            <thead>
            <tr>
                <td>Game</td>
                <td>Release Date</td>
                {/*<td>Platform</td>*/}

            </tr>
            </thead>
            <tbody>
            {games.map((game) => (
                <>
                    <tr className="game-row" key={game.id} onClick={() => handleRowClick(game.id)}>
                        <td className={`${isTrackedGame(game.id) && "tracked"}`}>
                            {game.name}
                        </td>
                        <td>
                            {new Date(game.first_release_date * 1000).toLocaleDateString("fr-FR")}
                        </td>
                        {/*<td>*/}
                        {/*    {game.platforms?.map((platform,i)=>(game.platforms.length === i ? platform.name : platform.name + ", "))}*/}
                        {/*</td>*/}
                    </tr>
                    {
                        expandedGame === game.id && (
                            <tr className='expandable'>
                                <td colSpan={2} >
                                    <GameDetails gameID={game.id} isTracked={isTrackedGame(game.id)} onTrack={onTrack}/>
                                </td>
                            </tr>
                        )
                    }
                </>
            ))}
            </tbody>
        </table>

    )
}

export default GameList