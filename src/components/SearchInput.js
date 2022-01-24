import * as React from "react";

const SearchInput = ({onSearch}) => {
    const inputRef = React.useRef()
    const handleClick = () => {
        onSearch(inputRef.current.value)
    }
    const handleKeypress = e => {
        if (e.key === 'Enter') {
            handleClick(e);
        }
    };

    return (
        <div>
            <input className='search-input' type='text' ref={inputRef} placeholder='Search' onKeyPress={handleKeypress}/>
            <button className='btn' onClick={handleClick}>Search</button>
        </div>
    )
}

export default SearchInput