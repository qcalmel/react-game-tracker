import SearchInput from "./SearchInput";
import GameList from "./GameList";
import {getGameList} from "../helpers/api";
import {sortArrayByProperty} from "../helpers/sorting";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {GameListContext} from "./GameTracker";

const GameSearch = () => {
    const {searchedGameList,setSearchedGameList,trackedGameID,handleTrack} = useContext(GameListContext)
    // const [gameList, setGameList] = React.useState([])
    const [search, setSearch] = useState(useParams().query)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!search) return
        getGameList(search)
            .then(res => {
                setSearchedGameList(sortArrayByProperty(res.data,'first_release_date'))
                setIsLoading(false)
            })
            .catch(error => {
                setError(error);
            })
    }, [search])

    const handleSearch = (text) => {
        if (text !== search && text) {
            setSearch(text)
            setIsLoading(true)
        }
    }
    return (
        <div>
            <SearchInput onSearch={handleSearch}/>
            {searchedGameList.length > 0 && !isLoading ? searchedGameList.length + " Games Found" : null}
            {
                isLoading
                    ?
                    'Loading'
                    :
                    (
                        searchedGameList.length > 0
                            ?
                            <GameList games={searchedGameList} trackedGameID={trackedGameID} onRowCLick={handleTrack}/>
                            :
                            null
                    )
            }
            {search && searchedGameList.length === 0 && !isLoading ? 'No Games Found' : null}
        </div>

    )
}

export default GameSearch