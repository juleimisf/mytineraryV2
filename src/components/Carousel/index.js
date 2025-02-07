import React from "react";

import { STRINGS } from "../utils/strings";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.85;
const cardSpacing = 10;

const CustomCarousel = (props) => {

  if (!props.cities || props.cities.length === 0) {
    return <Text style={styles.errorText}>{STRINGS.ALERT_MESSAGE}</Text>;
  }

  return (
    <View style={styles.container}>
      <Carousel
        width={cardWidth + cardSpacing * 2}
        height={250}
        autoPlay={false}
        pagingEnabled={true}
        snapEnabled={true} 
        overscroll={false} 
        data={props.cities}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={[styles.card, { marginHorizontal: cardSpacing }]}> 
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
              onError={() => console.log(`Error loading image: ${item.image}`)}
            />
            <Text style={styles.cityName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
  },
  card: {
    width: cardWidth,
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#ccc",
  },
  cityName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default CustomCarousel;
