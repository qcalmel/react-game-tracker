import SearchInput from "./SearchInput";
import GameList from "./GameList";
import {getGameList} from "../helpers/api";
import {sortArrayByProperty} from "../helpers/sorting";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {GameListContext} from "./GameTracker";

const GameSearch = () => {
    const {
        searchedGameList,
        setSearchedGameList,
        trackedGameID,
        handleTrack
    } = useContext(GameListContext)
    const [search, setSearch] = useState(useParams().query)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!search) return
        getGameList(search)
            .then(res => {
                setSearchedGameList(sortArrayByProperty(res.data, 'first_release_date'))
                setIsLoading(false)
            })
            .catch(error => {
                setError(error);
                setSearchedGameList([])
                setIsLoading(false)
            })

    }, [search])
    const handleSearch = (text) => {
        if (text !== search && text) {
            setSearch(text)
            setIsLoading(true)
            setError(null)
        }
    }

    const showMessage = () => {
        if(error)
            return 'An error has occurred, please try later'
        if(searchedGameList.length > 0 && !isLoading)
            return searchedGameList.length + " Games Found"
        if(search && !isLoading) {
            return 'No Games Found'
        }
    }
    return (
        <div>
            <SearchInput onSearch={handleSearch}/>
            <h3>{showMessage()}</h3>
            {
                isLoading
                    ?
                    <h3>Loading...</h3>
                    :
                    (
                        searchedGameList.length > 0
                            ?
                            <GameList games={searchedGameList} trackedGameID={trackedGameID} onTrack={handleTrack}/>
                            :
                            null
                    )
            }
        </div>

    )
}

export default GameSearch