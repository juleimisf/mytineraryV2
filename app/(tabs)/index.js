import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import Hero from "../../components/Hero"
import Carousel from "../../components/Carousel"
import { STRINGS } from "../../components/utils/strings"
import { cities } from "../../components/data/cities";

export default function Index() {
  return (
    <ImageBackground 
      source={require("../../assets/bg_travel_hd.jpg")}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <Hero title={STRINGS.HERO_TITLE} subtitle={STRINGS.HERO_SUBTITLE} />
        <Carousel cities={cities} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)"
  },
});
