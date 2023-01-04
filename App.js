/* import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [timeData, setTimeData] = useState({});
  const [isNight, setIsNight] = useState(false);

  const getWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=YOUR_OPENWEATHERMAP_API_KEY`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTime = async (city) => {
    try {
      const response = await axios.get(
        `http://api.timezonedb.com/v2.1/get-time-zone?key=YOUR_TIMEZONEDB_API_KEY&format=json&by=zone&zone=${city}`
      );
      setTimeData(response.data);
      const hour = new Date(response.data.formatted).getHours();
      setIsNight(hour >= 20 || hour <= 6);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWeather('New York');
    getTime('America/New_York');
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: isNight ? '#222222' : '#F5F5F5' }]}>
      <Text style={[styles.header, { color: isNight ? '#FFFFFF' : '#000000' }]}>Weather App</Text>
      <View style={styles.form}>
        <Text style={[styles.label, { color: isNight ? '#FFFFFF' : '#000000' }]}>Enter a city:</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          onEndEditing={() => {
            getWeather(city);
            getTime(city);
          }}
        />
      </View>
      {weatherData.name ? (
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const getWeather = async () => {
    try {
      // Make a request to the OpenWeatherMap API to get the weather data for the chosen city
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9823bf34193c0728137a06a3cdd51d8b`
      );

      const weatherData = weatherResponse.data;

     /*  setDate(timezoneData.formatted);  */
      setWeather(weatherData.main.temp);

    } catch (error) {
      console.error(error);
    }
  };
  
  const isNight = async (city) => {
    try {
      // Make a request to the TimeZoneDB API to get the current date and time for the given city
      const response = await axios.get(
        `https://api.timezonedb.com/v2.1/get-time-zone?key=VUB31565ZLQC&format=json&by=zone&zone=${city}`
      );

      const data = response.data;
  
      // Determine if it is currently night time in the given city
      const hour = data.formatted;

      const night = hour < 6 || hour > 18;
      console.log(hour)

      setIsDarkMode(night); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>Enter a city:</Text>
      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        onChangeText={(text) => setCity(text)}
        value={city}
      />
      <Text style={[styles.button, isDarkMode && styles.darkButton]} onPress={() => {getWeather(), isNight()}}>
        Get Weather
      </Text>
      {date && (
        <Text style={[styles.text, isDarkMode && styles.darkText]}>
          Date: {date}
        </Text>
      )}
      {weather && (
        <Text style={[styles.text, isDarkMode && styles.darkText]}>
          Weather: {Math.round(weather - 273.14)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    margin: 10,
  },
  darkInput: {
    borderColor: '#fff',
  },
  button: {
    width: '80%',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 20,
    padding: 10,
    margin: 10,
    textAlign: 'center',
  },
  darkButton: {
    backgroundColor: '#fff',
    color: '#000',
  },
});

export default App;