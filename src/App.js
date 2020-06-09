import React , { useEffect, useState } from 'react';
import  styles from './App.module.css';
import { Cards, Charts , CountryPicker } from './components'
import { fetchData } from './api';
import coronaImage from './images/Tracker.png'

function App() {
  const [data, setData] = useState('');
  const [country, setCountry] = useState('');

  const handleCountryChange = (val) => 
  {
    fetchData(val).then(res=> 
    {
      setData(res.data);
      setCountry(val);
    })
  }
  
  
  useEffect(() => {
    fetchData()
    .then((res)=>  { setData(res.data); })
    .catch((err) => console.log("Error, api isn't working.....", err))
    }, []);

  return (
    <div className={styles.container}>
     <img className={styles.image} src={coronaImage}  alt="COVID-19"/>
     <Cards data ={data}/>
     <CountryPicker handleCountryChange={handleCountryChange} /> 
     <Charts data ={data} country={country} />
    </div>
  );
}

export default App;
