import React,{useEffect,useState} from 'react';
import { NativeSelect, FormControl} from '@material-ui/core';
import styles from './CountryPicker.module.css';
import { countries } from "../../api";

export default function CountryPicker({handleCountryChange}) {
const [fetchedCountries, setFetchedCountries] = useState([]);
    
useEffect(() => {
        countries()
        .then((res)=>  { setFetchedCountries(res.data.countries); })
        .catch((err) => console.log("Error, api isn't working.....", err))
        }, [setFetchedCountries]);
    console.log("fetched contries are ===>",fetchedCountries);
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value) }>
                <option value="">Global</option>
                {fetchedCountries.map((country , i) => <option key={i} value = {country.name}>{country.name}</option>)}
            </NativeSelect>
        </FormControl>
    )
}
