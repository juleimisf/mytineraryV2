import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import HeroComponent from "./src/components/Hero";
import CustomCarousel from "./src/components/Carousel";
import { handleExplore } from "./src/components/utils/alerts.js";
import { STRINGS } from "./src/components/utils/strings.js";
import { cities } from "/Users/jagf/mytinerary/src/components/data/cities.js";

export default function App() {
  return (
    <ImageBackground
      source={require("/Users/jagf/mytinerary/assets/bg_travel_hd.jpg")}
      style={styles.background}
    >
      <SafeAreaView>
        <HeroComponent
          title={STRINGS.HERO_TITLE}
          subtitle={STRINGS.HERO_SUBTITLE}
          onExplore={handleExplore}
        />
        <CustomCarousel cities={cities} />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
