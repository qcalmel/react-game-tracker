const getDate = (game) => {
    if(!game.release_dates)
        return 'No Date'
    const firstRelease = getFirstRelease(game.release_dates)
    return showDateByCategory(firstRelease)
}

const getFirstRelease = (releases) => {
    return releases.reduce((firstRelease, release) => {
        return (release.date < firstRelease?.date) || !firstRelease.hasOwnProperty('date') ? release : firstRelease
    }, {})


}

const showDateByCategory = (release) => {
    switch (release.category) {
        case 0 :
            return new Date(release.date * 1000).toLocaleDateString("fr-FR")
        case 1 :
            return new Date(release.date * 1000).toLocaleDateString("fr-FR",{year:'numeric',month:'numeric'})
        default :
            return release.human
    }
}

export {getDate,showDateByCategory}