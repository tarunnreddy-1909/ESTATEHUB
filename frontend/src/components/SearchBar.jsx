// Child component: it only shows the inputs.
// The parent (Hero) owns the state and passes values + handlers as props.
function SearchBar({ location, purpose, onLocationChange, onPurposeChange, onSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
      />
      <select value={purpose} onChange={(e) => onPurposeChange(e.target.value)}>
        <option value="All">Buy / Rent</option>
        <option value="Buy">Buy</option>
        <option value="Rent">Rent</option>
      </select>
      <button className="btn btn-green" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
