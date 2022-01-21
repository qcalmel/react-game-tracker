import {Routes, Route, NavLink,} from "react-router-dom";
import GameSearch from "./GameSearch";
import GameDetails from "./GameDetails";
import GameTracked from "./GameTracked";
import {createContext, useEffect, useState} from "react";

const GameListContext = createContext({})

const GameTracker = () => {

    const [searchedGameList,setSearchedGameList] = useState([])
    const [trackedGameList,setTrackedGameList] = useState([])
    const [trackedGameID,setTrackedGameID] = useState(JSON.parse(localStorage.getItem('trackedGames')))

    const handleTrack = (id) => {
        if(trackedGameID.some(trackedIDGame => trackedIDGame === id)){
            setTrackedGameID([...trackedGameID].filter(trackedIdGame => trackedIdGame !== id))
        }
        else{
            setTrackedGameID([...trackedGameID,id])
        }
    }

    useEffect(() =>{
        localStorage.setItem('trackedGames',JSON.stringify(trackedGameID))
    },[trackedGameID])
    return (
        <GameListContext.Provider value={{searchedGameList,setSearchedGameList,trackedGameID,handleTrack,trackedGameList,setTrackedGameList}}>
            <div>
                <nav>
                    <ul>
                        <li>
                            <NavLink className={({isActive}) => isActive ? "active" : ''} to="/search">Search</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive}) => isActive ? "active" : ''} to="/tracked">Tracked Games</NavLink>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/search" element={<GameSearch/>}/>
                    <Route path="/game/:id" element={<GameDetails/>}/>
                    <Route path="/tracked" element={<GameTracked/>}/>
                </Routes>
            </div>
        </GameListContext.Provider>
    )
}

export {GameTracker,GameListContext}