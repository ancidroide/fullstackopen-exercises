import { useEffect, useState } from "react"
import axios from "axios"

const Languages = ( {languages} ) => {
    const languagesArray = Object.values(languages)
    
    return (
        <ul>
            {languagesArray.map((language, index) => {
                return <li key={index}>{language}</li>
            })}
        </ul>
    )
}

const Flag = ( {flag} ) => {
    const srcFlag = flag.png
    const altFlag = flag.alt
    return (
        <img src={srcFlag} alt={altFlag}/>
    )
}

const Weather = ( {capital} ) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const apiKey = import.meta.env.VITE_WEATHERAPI_KEY;
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capital}&aqi=no`;
        axios.get(url)
            .then(response => {
                setWeatherData(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.error(error)
                setLoading(false)
            })
    }, [capital])

    if (loading) {
        return (
            <div>
                <p>Weather data is loading</p>
            </div>
        )

    } else if (weatherData) {
        return (
            <div>
                <p>{weatherData.current.temp_c}</p>
                <p>{weatherData.current.condition.text}</p>
                <p>{weatherData.current.wind_kph}</p>
                <p>{weatherData.current.humidity}</p>
            </div>
        )
    } else {
        return (
            <div>
                <p>error</p>
            </div>
        )
    }
    
}

const Country = ( {country} ) => {
    const name = country.name.common
    const capital = country.capital?.[0] || 'No capital'
    const area = country.area
    const languages = country.languages
    const flag = country.flags
    
    return (
        <div>
            <h2>{name}</h2>
            <p>Capital {capital}</p>
            <p>Area {area}</p>

            
            <h2>Languages</h2>
            <Languages languages={languages}/>
            <Flag flag={flag}/>
            <Weather capital={capital}/>

        </div>
    )
}



export default Country