const sortArrayByProperty = (array,property,direction) => {
    const sortedGameList = [...array]
    const compare = (a, b) => {
        if (a[property] > b[property] || b[property] == null) {
            return -1;
        }
        if (a[property] < b[property] || a[property] == null) {
            return 1;
        }
        return 0;
    }
    sortedGameList.sort(compare)
    if(direction === 'ASC'){
        sortedGameList.reverse()
    }
    return sortedGameList
}

export {sortArrayByProperty}