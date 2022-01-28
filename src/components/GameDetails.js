import * as React from "react";
import {useEffect, useState} from "react";
import {getSingleGame} from "../helpers/api";
import {getRegionName} from "../helpers/region-name";
import {sortArrayByProperty} from "../helpers/sorting";
import {showDateByCategory} from "../helpers/date";

const GameDetails = ({gameID, isTracked, onTrack}) => {
    const [game, setGame] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        getSingleGame(gameID)
            .then(res => {
                setGame(res.data[0])
                setIsLoading(false)
            }).catch(err => console.log(err))
    }, [])

    const getCover = (coverID) => {
        const baseURL = '//images.igdb.com/igdb/image/upload/t_cover_big/'
        if (coverID)
            return baseURL + coverID + '.jpg'
        return baseURL + 'nocover.png'
    }
    const getReleaseDateByPlatform = (gameReleases) => {
        const gameReleaseGroupByPlatform = gameReleases.reduce((gameReleasesByPlatform, release) => {
            let platformIndex = gameReleasesByPlatform.findIndex(element => element.platform === release.platform.name)
            if (platformIndex === -1) {
                gameReleasesByPlatform.push({platform: release.platform.name, releases: []})
                platformIndex = gameReleasesByPlatform.length - 1
            }
            gameReleasesByPlatform[platformIndex].releases.push({
                region: getRegionName(release.region),
                date: release.date,
                category: release.category,
                human: release.human


            })
            return gameReleasesByPlatform
        }, [])
        return gameReleaseGroupByPlatform.map(platform => {
            return {...platform, releases: sortArrayByProperty(platform.releases, 'date', 'DESC')}
        })
    }

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
                                    src={getCover(game.cover?.image_id)}
                                    alt='game cover'
                                />
                                <input
                                    onClick={() => onTrack(game.id)}
                                    type='button'
                                    value={isTracked ? "Untrack" : "Track"}
                                    className={isTracked ? "btn btn-red" : "btn"}
                                />
                            </div>
                            <div className='game-content'>
                                <h3>{game.name}</h3>
                                <p>Genre : {game.genres?.map((genre, i) => (game.genres.length - 1 === i ? genre.name :
                                    genre.name + ", "))}</p>
                                <p>Platforms
                                    : {game.platforms?.map((platform, i) => (game.platforms.length - 1 === i ? platform.name :
                                        platform.name + ", "))}
                                </p>
                                {
                                    game?.release_dates &&
                                <table className="table-release">
                                    <thead>
                                    <tr>
                                        <td>Platform</td>
                                        <td>Region</td>
                                        <td>Release</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        getReleaseDateByPlatform(game.release_dates).map((platform) => {
                                            const platformName = platform.platform
                                            return (
                                                platform.releases.map((release, i) => (
                                                    <tr>
                                                        <td>{i === 0 && platformName}</td>
                                                        <td>{release.region}</td>
                                                        <td>{showDateByCategory(release)}</td>
                                                    </tr>
                                                ))
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                                }
                            </div>

                        </div>

                    )
            }
        </>
    )
}

export default GameDetails