import React from "react";
import { View, StyleSheet, ImageBackground, ActivityIndicator, Text } from "react-native";
import Hero from "../../src/components/Hero";
import Carousel from "../../src/components/Carousel";
import { STRINGS } from "../../src/components/utils/strings";
import useFetchCities from "../../src/hooks/useFetchCities";
import ApiError from "../../src/components/ApiError";

export default function Index() {
  const { cities, loading, error } = useFetchCities();

  return (

      <View>
        <ImageBackground
          source={require("../../assets/bg_travel_hd.jpg")}
          style={styles.background}
          resizeMode="cover">
          <View style={styles.container}>
            <Hero title={STRINGS.HERO_TITLE} subtitle={STRINGS.HERO_SUBTITLE} />
            {loading ? (
              <ActivityIndicator size="large" color="#fff" style={styles.loader} />
            ) : error ? (
              <ApiError message={STRINGS.ERROR_RESULT_CONTENT} />
            ) : (
              <Carousel cities={cities} />
            )}
          </View>
        </ImageBackground>      
        </View>
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
