//Search bar for Board Game Geek API
import React from 'react';

const SearchBgg = (props) => (
  <form className="search-bar" onSubmit={props.handleSearchSubmit}>
    <label>
      <h3>Search on Board Game Geek:</h3>
      <input type="text" name="search" value={props.search} onChange={props.handleChange}></input>
    </label>
    <input type="submit" className="search btn" value="Search!"></input>
  </form>
)


export default SearchBgg;