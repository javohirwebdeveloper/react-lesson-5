import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div>
        {filteredCountries.map((country) => (
          <div key={country.cca2} className="country-card">
            <img
              className="country-flag"
              src={country.flags.svg}
              alt={`${country.name.common} Flag`}
            />
            <div className="country-info">
              <h2 className="country-name">{country.name.common}</h2>
              <div className="country-details">
                <p>Population: {country.population}</p>
                <p>Region: {country.region}</p>
                <p>Capital: {country.capital}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
