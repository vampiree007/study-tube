import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './search.styles.css';

const SearchBar = () => {
    return (
        <div className="searchBar">
            <form>
                <input type="search" name="search" id="searchBar" placeholder="Search"/>
                <button><SearchIcon/></button>
            </form>
        </div>
    )
}

export default SearchBar;
