import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

const allCities = [
    "Istanbul",
    `New York`,
    `Tokyo`,
    `Seoul`,
    `Londra`,
    `Madrid`,
    `Hong Kong`,
    "Ankara",
    "Izmir",
    "Bursa",
    "Adana",
    "Gaziantep",
    "Konya",
    "Antalya",
    "Eskisehir",
    "Diyarbakir",
];

const App = ({setCity}) => {
  return (
    <View style={styles.container}>
        <FlatList
            style={styles.flatlist}
            data={allCities}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => setCity(item)}
                    style={styles.optionButton}
                >
                    <Text>{item}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={item => item}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    flatlist:{
        height:520,
        flexGrow: 0
    },
    optionButton: {
      padding: 10,
      borderRadius:15,
      borderWidth: 1,
      borderBottomColor: "gray",
      width: 300,
    },
  });

export default App;
