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

        </div>
    )
}



export default Country