import GameList from "./GameList";
import {useContext, useEffect} from "react";
import {GameListContext} from "./GameTracker";
import {getTrackedGameList} from "../helpers/api";

const GameTracked = () => {
    const {trackedGameID,trackedGameList,setTrackedGameList} = useContext(GameListContext)

    useEffect(() => {
        if (trackedGameID.length > 0){
        getTrackedGameList(trackedGameID)
            .then(res => {
                setTrackedGameList(res.data)
            })
            .catch(err=>console.log(err))
        }else {
            setTrackedGameList([])
        }
    },[trackedGameID])
    return (
        <div>
            {trackedGameID.length + (trackedGameID.length > 1 ? " Games" : " Game" )+ " Tracked"}
        {trackedGameList.length > 0 && <GameList games={trackedGameList}/>}
        </div>
    )
}

export default GameTracked