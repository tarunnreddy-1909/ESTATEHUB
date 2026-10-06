// STUDENT MODIFICATIONS live here: Buy/Rent filter and Price filter
// (plus location and property type). This is a child component:
// it receives the current filter values as props and tells the parent
// about changes by calling onFilterChange.
function FilterBar({ filters, onFilterChange, onReset }) {
  // onChange handler shared by all inputs (uses the input's "name")
  function handleChange(e) {
    onFilterChange(e.target.name, e.target.value);
  }

  return (
    <div className="filter-bar">
      <input
        type="text"
        name="keyword"
        placeholder="Search by name or location"
        value={filters.keyword}
        onChange={handleChange}
      />

      <select name="location" value={filters.location} onChange={handleChange}>
        <option value="All">All Locations</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Mysore">Mysore</option>
        <option value="Chennai">Chennai</option>
        <option value="Hyderabad">Hyderabad</option>
      </select>

      <select name="type" value={filters.type} onChange={handleChange}>
        <option value="All">All Types</option>
        <option value="Apartment">Apartment</option>
        <option value="Villa">Villa</option>
        <option value="House">House</option>
      </select>

      {/* Student Modification 1: Buy / Rent / All */}
      <select name="purpose" value={filters.purpose} onChange={handleChange}>
        <option value="All">Buy / Rent (All)</option>
        <option value="Buy">Buy</option>
        <option value="Rent">Rent</option>
      </select>

      {/* Student Modification 2: Price range */}
      <select name="price" value={filters.price} onChange={handleChange}>
        <option value="All">Any Price</option>
        <option value="under50">Under ₹50 Lakhs</option>
        <option value="50to100">₹50 Lakhs - ₹1 Crore</option>
        <option value="100to200">₹1 Crore - ₹2 Crore</option>
        <option value="above200">Above ₹2 Crore</option>
      </select>

      <button className="btn btn-outline" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

export default FilterBar;
