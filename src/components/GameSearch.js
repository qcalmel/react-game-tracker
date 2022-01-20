import * as React from "react";
import SearchInput from "./SearchInput";
import GameList from "./GameList";
import axios from "axios";
import {getGameList} from "../helpers/api";
import {sortArrayByProperty} from "../helpers/sorting";
import {useParams} from "react-router-dom";
import {useContext} from "react";
import {GameListContext} from "./GameTracker";

const GameSearch = () => {
    const {gameList,setGameList} = useContext(GameListContext)
    // const [gameList, setGameList] = React.useState([])
    const [search, setSearch] = React.useState(useParams().query)
    const [error, setError] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        if (!search) return
        getGameList(search)
            .then(res => {
                setGameList(sortArrayByProperty(res.data,'first_release_date'))
                setIsLoading(false)
            })
            .catch(error => {
                setError(error);
            })
    }, [search])

    const handleTextChange = (text) => {
        if (text !== search && text) {
            setSearch(text)
            setIsLoading(true)
        }
    }
    return (
        <div>
            <SearchInput onSearch={handleTextChange}/>
            {gameList.length > 0 && !isLoading ? gameList.length + " Games Founded" : null}
            {
                isLoading
                    ?
                    'Loading'
                    :
                    (
                        gameList.length > 0
                            ?
                            <GameList games={gameList}/>
                            :
                            null
                    )
            }
            {search && gameList.length === 0 && !isLoading ? 'No Games Found' : null}
        </div>

    )
}

export default GameSearch