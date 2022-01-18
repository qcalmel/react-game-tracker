import * as React from "react";

const SearchInput = ({onSearch}) => {
    const inputRef = React.useRef()
    const handleClick = e => {
        onSearch(inputRef.current.value)
    }
    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.key === 'Enter') {
            handleClick(e);
        }
    };

    return (
        <div>
            <h2>Search Games</h2>
            <input type='text' ref={inputRef} placeholder='Search' onKeyPress={handleKeypress}/>
            <button onClick={handleClick}>Search</button>
        </div>
    )
}

export default SearchInput