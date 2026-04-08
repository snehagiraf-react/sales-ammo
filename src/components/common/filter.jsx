// ...existing code...
const Filter = ({ placeholder = 'Search...', value = '', onChange, onSearch }) => {
  const handleChange = (e) => {
    if (onChange) onChange(e.target.value); // changed to pass value
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (onSearch) onSearch(e.target.value); // remains value
    }
  };

  return (
    <>
      <div className="filter-search-container">
        <div className="header_search">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </>
  );
};
// ...existing code...

export default Filter;
// ...existing code...