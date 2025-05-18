import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";

function CountryStateCity({
  countryValue,
  stateValue,
  cityValue,
  handleCountryChange,
  handleStateChange,
  handleCityChange,
}) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Load countries on component mount
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (countryValue) {
      const countryStates = State.getStatesOfCountry(countryValue);
      setStates(countryStates);
      setCities([]); // Clear cities when country changes
    } else {
      setStates([]);
      setCities([]);
    }
  }, [countryValue]);

  // Load cities when state changes
  useEffect(() => {
    if (countryValue && stateValue) {
      const stateCities = City.getCitiesOfState(countryValue, stateValue);
      setCities(stateCities);
    } else {
      setCities([]);
    }
  }, [countryValue, stateValue]);

  const onCountryChange = (event) => {
    const selectedCountry = event.target.value;
    handleCountryChange(event);
    // Reset state and city when country changes
    if (handleStateChange) {
      handleStateChange({ target: { name: "businessLocation", value: "" } });
    }
    if (handleCityChange) {
      handleCityChange({ target: { name: "businessTown", value: "" } });
    }
  };

  const onStateChange = (event) => {
    const selectedState = event.target.value;
    handleStateChange(event);
    // Reset city when state changes
    if (handleCityChange) {
      handleCityChange({ target: { name: "businessTown", value: "" } });
    }
  };

  const onCityChange = (event) => {
    handleCityChange(event);
  };

  return (
    <div className="space-y-4">
      {/* Country Dropdown */}
      <div className="relative border border-gray-300 rounded-lg">
        <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
          Country<span className="text-red-500">*</span>
        </label>
        <select
          name="country"
          className="w-full px-4 py-2 bg-transparent border-none outline-none"
          value={countryValue}
          onChange={onCountryChange}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* State Dropdown */}
      <div className="relative border border-gray-300 rounded-lg">
        <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
          Business Location<span className="text-red-500">*</span>
        </label>
        <select
          name="businessLocation"
          className="w-full px-4 py-2 bg-transparent border-none outline-none"
          value={stateValue}
          onChange={onStateChange}
          disabled={!countryValue}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      <div className="relative border border-gray-300 rounded-lg">
        <label className="absolute top-0 left-2 bg-white text-gray-500 text-sm px-1 -translate-y-1/2">
          Business Town<span className="text-red-500">*</span>
        </label>
        <select
          name="businessTown"
          className="w-full px-4 py-2 bg-transparent border-none outline-none"
          value={cityValue}
          onChange={onCityChange}
          disabled={!stateValue}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CountryStateCity;
