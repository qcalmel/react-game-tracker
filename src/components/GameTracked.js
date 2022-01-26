import GameList from "./GameList";
import {useContext, useEffect} from "react";
import {GameListContext} from "./GameTracker";
import {getTrackedGameList} from "../helpers/api";
import {sortArrayByProperty} from "../helpers/sorting";

const GameTracked = () => {
    const {trackedGameID,trackedGameList,setTrackedGameList,handleTrack} = useContext(GameListContext)

    useEffect(() => {
        if (trackedGameID.length > 0){
        getTrackedGameList(trackedGameID)
            .then(res => {
                setTrackedGameList(sortArrayByProperty(res.data,"first_release_date"))
            })
            .catch(err=>console.log(err))
        }else {
            setTrackedGameList([])
        }
    },[trackedGameID])
    return (
        <div>
            <h3>{trackedGameID.length + (trackedGameID.length > 1 ? " Games" : " Game" )+ " Tracked"}</h3>
        {trackedGameList.length > 0 && <GameList games={trackedGameList} onTrack={handleTrack}/>}
        </div>
    )
}

export default GameTracked