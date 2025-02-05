import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import CustomCarousel from "../src/components/Carousel"
import HeroComponent from "../src/components/Hero";
import { handleExplore } from "../src/components/utils/alerts.js";
import { STRINGS } from "../src/components/utils/strings.js";
import { cities } from "../src/components/data/cities.js";

export default function Home() {
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
    flex: 1
  }
});