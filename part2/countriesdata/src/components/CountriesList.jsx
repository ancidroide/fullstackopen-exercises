import Country from "./Country"

const CountriesList = ( {filteredCountries, handleShowDetails} ) => {

    // too many countries
    if (filteredCountries.length > 10) {
        return (
            <p>too many countries, specify another filter</p>
        )
        
        // show countries list ()
    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
        return (
            <div>
                <ul>
                    {filteredCountries.map(country => 
                        <li key={country.name.common}>
                            {country.name.common}
                            <button onClick={() => handleShowDetails(country)}>Show</button>
                        </li>)}
                </ul>
            </div>
        )

        // exactly 1 country found
    } else if (filteredCountries.length === 1) {
        const foundCountry = filteredCountries[0]
        return (
            <div>
            <Country key={foundCountry.name.common} country={foundCountry} />
        </div>
        )
        
    } else {
        // no country found
        return (
            <p>'no country found'</p>
        )
    }
    }

export default CountriesList