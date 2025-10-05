import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import { useState } from 'react';

export function SearchBox({updateInfo}){
    let [city,setCity]=useState("");
    let [error,setError]=useState(false);
   const API_URL = `https://api.openweathermap.org/data/2.5/weather`;
    const API_KEY = "c3210c8f7f62f497bd7c96d5e8178769";

    let getWeatherInfo = async () => {
    try{
        let response = await fetch(`${API_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    let jsonResponse = await response.json();
    console.log(jsonResponse);
    let result={
        city:city,
        temp:jsonResponse.main.temp,
        tempMin:jsonResponse.main.temp_min,
        tempmax:jsonResponse.main.temp_max,
        humidity:jsonResponse.main.humidity,
        feelsLike:jsonResponse.main.feels_like,
        weather:jsonResponse.weather[0].description,
    };
    console.log(result);
    return result;
    }catch(err){
        throw err;
    }
};
    let handleChange=(e)=>{
        setCity(e.target.value);
    }
    let handleSubmit=async(e)=>{
       try{
         e.preventDefault();
        console.log(city);
        setCity("");
        let newInfo=await getWeatherInfo();
        updateInfo(newInfo);
       }catch(err){
        setError(true);
       }
    };

    return <div className='SearchBox'>
        <h3>This is search box</h3>
        <form onSubmit={handleSubmit}>
             <TextField  
             id="city" 
             label="city-name" 
             variant="outlined" 
             required 
             value={city}
              onChange={handleChange}
             />
             <br /><br />
              <Button variant="contained" type='submit' > Search</Button>
              <br /><br />
              {error && <p style={{color:"red"}}>No such place found!</p>}
        </form>
    </div>
}