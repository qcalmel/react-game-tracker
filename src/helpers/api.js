import * as axios from "axios";

const baseURL = process.env.REACT_APP_API

const getGameList = (query) => {
    return axios({
        url: `${baseURL}/games`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': 'vdyvkae7tp66ret5xpmzl00h0je5eu',
            'Authorization': 'Bearer zacq1qom1jddqxijm9d5ioqb9hyo3m',
        },
        data:
            `fields id,name,first_release_date,platforms.name,release_dates.human,release_dates.category,release_dates.date;
             search "${query}";
             where version_parent = null & category = 0;
             limit 200;`
    })
}

const getTrackedGameList = (trackedListID) => {

    return axios({
        url: `${baseURL}/games`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': 'vdyvkae7tp66ret5xpmzl00h0je5eu',
            'Authorization': 'Bearer zacq1qom1jddqxijm9d5ioqb9hyo3m',
        },
        data:
            `fields id,name,first_release_date,platforms.name,release_dates.human,release_dates.category,release_dates.date;
             where id = (${trackedListID.toString()}) & version_parent = null & category = 0;
             limit 200;`
    })
}

const getSingleGame = (id) => {

    return axios({
        url: `${baseURL}/games`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': 'vdyvkae7tp66ret5xpmzl00h0je5eu',
            'Authorization': 'Bearer zacq1qom1jddqxijm9d5ioqb9hyo3m',
        },
        data:
            `fields id,name,first_release_date,platforms.name,genres.name,cover.image_id;
             where id = ${id};`
    })
}

export {getGameList,getTrackedGameList,getSingleGame}