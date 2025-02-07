import React from "react";
import { View, StyleSheet } from "react-native";
import Hero from "../../components/Hero"
import Carousel from "../../components/Carousel";
import { STRINGS } from "../../components/utils/strings";

export default function Index() {

  const cities = [
    { name: "Paris", image: require("/Users/jagf/mytinerary/assets/images/caracas.png") },
    { name: "Tokyo", image: require("/Users/jagf/mytinerary/assets/images/caracas.png") },
  ];
 
  return (
  
    <View style={styles.container}>
      <Hero title={STRINGS.HERO_TITLE} subtitle={STRINGS.HERO_SUBTITLE} />
      <Carousel cities={cities} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});