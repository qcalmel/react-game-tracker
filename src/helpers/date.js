const getDate = (game) => {
    if(!game.release_dates)
        return 'No Date'
    const firstRelease = getFirstRelease(game.release_dates)
    switch (firstRelease.category) {
        case 0 :
            return new Date(firstRelease.date * 1000).toLocaleDateString("fr-FR")
        case 1 :
            return new Date(firstRelease.date * 1000).toLocaleDateString("fr-FR",{year:'numeric',month:'numeric'})
        default :
            return firstRelease.human
    }
}

const getFirstRelease = (releases) => {
    return releases.reduce((firstRelease, release) => {
        return (release.date < firstRelease?.date) || !firstRelease.hasOwnProperty('date') ? release : firstRelease
    }, {})


}

export {getDate}