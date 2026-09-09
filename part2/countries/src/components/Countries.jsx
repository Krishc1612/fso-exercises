import Weather from "./Weather";

const Capital = ({ capital }) => {
  if (capital.length === 0) return null;
  // console.log(Array.isArray(capital));

  const allCapitals =  capital.join(", ");
  return (
    <p>Capitals: {allCapitals}</p>
  );
}

const Languages = ({ languages }) => {
  const arrLanguages = Object.entries(languages);

  return (
    <div>
      <h2>Languages</h2>
      <ul>
        {arrLanguages.map(([key, language]) => 
          <li key = {key}>{language}</li>
        )}
      </ul>
    </div>
  );
}

const Country = ({ country, inDetail, changeToShow }) => {
  if (inDetail){    
    return (
      <div>
        <h1>{country.name.common}</h1>
        <Capital capital = {country.capital}/>
        <p>Area {country.area}</p>
        <Languages languages = {country.languages}/>
        <img src={country.flags.png} alt={country.flags.alt} />
        <Weather capital = {country.capital} latlng = {country.capitalInfo.latlng}/>
    </div>
    );
  }

  return (
    <p>{country.name.common} <button onClick = {() => changeToShow(country.name.common)}>Show</button></p>
  );
}

const Countries = ({ toShow, changeToShow }) => {
  if (toShow.length > 10){
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  // console.log(toShow.length);

  return (
    <div>
      {toShow.map(country => 
        <Country key = {country.name.common} country = {country} inDetail = {toShow.length === 1} changeToShow = {changeToShow}/>
      )}
    </div>
  );
}

export default Countries;