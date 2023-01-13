import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import axios from "axios";
import Cities from "./Cities";

const App = () => {
  const [city, setCity] = useState("Istanbul");
  const [weather, setWeather] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("")

  useEffect(() => {
    if(city != ""){
      getWeather()
    }
  }, [city])
  
  const getWeather = async () => {
    try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9823bf34193c0728137a06a3cdd51d8b`);
      const weatherData = weatherResponse.data;

      setWeatherIcon(weatherData.weather[0].icon)
      setWeather(weatherData.main.temp);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <View style={styles.container}>
      {weather && 
        <View>
          <Text style={styles.cityText}>
            {city}
          </Text>
          <Text style={styles.weatherText}>
            {Math.round(weather - 273.14)} °C
          </Text>
        </View>
      }
      {weatherIcon &&
        <Image style={styles.weatherImage} source={{uri: `http://openweathermap.org/img/w/${weatherIcon}.png`}}/> 
      }
      <View style={styles.citiesContainer}>
        <Cities setCity={setCity}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  cityText:{
    fontSize: 36,
    color: "#333",
    textAlign:"center"
  },
  weatherText: {
    marginTop:25,
    fontSize: 32,
    color: "#333",
    textAlign:"center"
  },
  weatherImage: {
    position:"absolute",
    top:50,
    width:75,
    height:75,
    zIndex:-99
  },
  citiesContainer:{
    marginTop:35
  }
});

export default App;