import * as React from "react";
import {Routes, Route, Link, NavLink,} from "react-router-dom";
import GameSearch from "./GameSearch";
import GameDetails from "./GameDetails";

const GameListContext = React.createContext({})

const GameTracker = () => {

    const [gameList,setGameList] = React.useState([])

    return (
        <GameListContext.Provider value={{gameList,setGameList}}>
            <div>
                <nav>
                    <ul>
                        <li>
                            <NavLink className={({isActive}) => isActive && "active"} to="/search">Search</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive}) => isActive && "active"} to="/tracked">Tracked Games</NavLink>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/search" element={<GameSearch/>}/>
                    <Route path="/game/:id" element={<GameDetails/>}/>
                </Routes>
            </div>
        </GameListContext.Provider>
    )
}

export {GameTracker,GameListContext}