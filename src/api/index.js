import axios from "axios";

const url = "https://covid19.mathdro.id/api";
const url1 = "https://api.covid19api.com/";
const urlStates = "https://covid-india-cases.herokuapp.com/states/";
const urlStatetimeline = "https://covid-india-cases.herokuapp.com/statetimeline/";

export const fetchData = (country) => { 
    let changeableUrl = url;
    if(country){
        changeableUrl = `${url}/countries/${country}` 
    }
    return axios.get(changeableUrl);
}  

export const fetchDailyData = () => {return axios.get(`${url}/daily`);}

export const countries = () => {return axios.get(`${url}/countries`);}