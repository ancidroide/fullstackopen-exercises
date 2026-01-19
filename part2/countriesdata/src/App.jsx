import { useState, useEffect } from "react";
import countriesService from './services/countries.js'
import SearchFilter from "./components/SearchFilter";
import CountriesList from "./components/CountriesList.jsx";


const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    countriesService
    .getCountries()
    .then(allCountries => {
      setCountries(allCountries)
    })
    .catch(error => console.error(error))
  }, [])

  // handle search from SearchFilter form
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  // filtered countries (state array) based on SearchFilter value
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase()
  .includes(search.toLocaleLowerCase()))


  return (
    <div>
      <SearchFilter handler={handleSearch} value={search}/>
      <CountriesList filteredCountries={filteredCountries} />

    </div>
  )


}

export default App