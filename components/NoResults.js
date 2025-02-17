import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { STRINGS } from "./utils/strings";
import noResultsImage from "../assets/default-city.png";

const NoResults = ({ message = STRINGS.SEARCH_BAR_NOT_RESULTS}) => {
  return (
    <View style={styles.container}>
      <Image source={noResultsImage} style={styles.image} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 50,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginTop: 10,
  },
});

export default NoResults;
