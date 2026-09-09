import { useState, useEffect } from "react";
import axios from "axios"

import Countries from './components/Countries'

const App = () => {
  const [queryValue, setQueryValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [toShow, setToShow] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        // console.log(response.data)
        setCountries(response.data);
      })
  }, [])

  const changeToShow = (query) => {
    const smallQuery = query.toLowerCase();

    const newToShow = countries.filter(country => country.name.common.toLowerCase().includes(smallQuery));

    setToShow(newToShow);
  }

  const handleQuery = (event) => {
    // console.log("changed to", event.target.value);
    setQueryValue(event.target.value)
    if (event.target.value !== "") changeToShow(event.target.value);
    else setToShow([]);
  }

  return (
    <div>
      <form>
        find countries <input value = {queryValue} onChange ={handleQuery} />
      </form>
      <Countries 
        toShow = {toShow}
        changeToShow = {changeToShow}  
      />
    </div>
  );
}

export default App;