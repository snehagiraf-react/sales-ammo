import Select from 'react-select';
import { useEffect, useState } from 'react';

function Country() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatOptionLabel = ({ label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <img
        src={`https://flagcdn.com/w20/${value.toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/w40/${value.toLowerCase()}.png 2x`}
        width="20"
        height="15"
        alt={label}
        style={{ borderRadius: 2 }}
      />
      <span>{label}</span>
    </div>
  );

  useEffect(() => {
  fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
    .then(res => res.json())
    .then(data => {
      const formatted = data
        .filter(c => c.cca2 && c.name?.common)
        .map(c => ({
          label: c.name.common,
          value: c.cca2
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      console.log('Formatted countries:', formatted);
      setCountries(formatted);
    })
    .catch(err => console.error('Country API error:', err));
}, []);

  return (
    <div style={{marginTop:'10px'}}>
      <label style={{ display: 'block', marginBottom: 6 }}>
        Countries
      </label>

      <Select
        options={countries}
        value={selectedCountry}
        onChange={setSelectedCountry}
        placeholder={loading ? 'Loading countries...' : 'Select a country'}
        formatOptionLabel={formatOptionLabel}
        isSearchable
        isLoading={loading}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        styles={{
          control: base => ({
            ...base,
            minHeight: 40,
            borderRadius: 12,
            border: 'none',
            boxShadow: 'none',
            padding:'0.5rem',
            boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)",
            '&:hover': {
              border: 'none'
            }
          }),
          menuPortal: base => ({
            ...base,
            zIndex: 9999
          })
        }}
      />
    </div>
  );
}

export default Country;
