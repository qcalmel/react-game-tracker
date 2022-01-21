// import {useNavigate} from "react-router-dom";

const GameList = ({games,trackedGameID, onRowCLick}) => {
    // const navigate = useNavigate()
    const handleRowClick = (id) => {
        // navigate(`/game/${id}`)
        onRowCLick(id)
    }

    const isTrackedGame = (id) => (
        trackedGameID?.some((trackedGameId) => trackedGameId === id)
    )
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
                    <tr key={game.id} onClick={()=> handleRowClick(game.id) }>
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
            ))}
            </tbody>
        </table>

    )
}

export default GameList