import { useState, useEffect } from 'react'
import Country from './components/Country.jsx'
import CountryDetails from './components/CountryDetails.jsx'
import countriesService from './services/countries.js'


const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [toggleDetails, setToggleDetails] = useState(false)
  const [clickedCountry, setClickedCountry] = useState('')

  useEffect(() => {
    countriesService.getAll()
      .then(request => setCountries(request))
  }, [])

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  const handleCountryButton = (countryButton) => {
    if (clickedCountry === countryButton) {
      setToggleDetails(false)
      setClickedCountry('')
    } else if (toggleDetails && (clickedCountry !== countryButton)) {
      setClickedCountry(countryButton)
    } else {
      setClickedCountry(countryButton)
      setToggleDetails(!toggleDetails)
    }
  }

  const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase()))

  let content
  let details

  if (country === '') {
    content = <p></p>
  } else if (filteredCountries.length === 1) {
    content = <CountryDetails
      country={filteredCountries[0]}
    />
  } else if (filteredCountries.length > 10) {
    content = <p>Too many matches, specify another filter</p>
  } else {
    content = filteredCountries.map(country => {
      return (
        <div key={country.cca3}>
          <Country country={country} />
          <button type='button' onClick={() => handleCountryButton(country)}>Show</button>
        </div>
      )
    })
  }

  if (toggleDetails) {
    details = <CountryDetails
      country={clickedCountry}
    />
  } else {
    details = <></>
  }

  return (
    <div>
      <input value={country} onChange={handleCountryChange} />
      {content}
      {details}
    </div>
  )
}

export default App
