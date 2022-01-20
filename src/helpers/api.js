import * as axios from "axios";

const getGameList = (query) => {
    return axios({
        url: `${process.env.REACT_APP_API}/games`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': 'vdyvkae7tp66ret5xpmzl00h0je5eu',
            'Authorization': 'Bearer zacq1qom1jddqxijm9d5ioqb9hyo3m',
        },
        data:
            `fields id,name,first_release_date,platforms.name;
             search "${query}";
             where version_parent = null & category = 0;
             limit 200;`
    })
    // .then(response => {
    //     return response.data
    // })
    // .catch(err => {
    //     console.error(err);
    // });
}

export {getGameList}