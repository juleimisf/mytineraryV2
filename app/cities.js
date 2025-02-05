import { View, FlatList, StyleSheet } from "react-native";
import CityCard from "../src/components/CityCard/CityCard"

export default function Cities() {
  const cities = [
    { name: "Paris", image: require("/Users/jagf/mytinerary/assets/images/caracas.png") },
    { name: "Tokyo", image: require("/Users/jagf/mytinerary/assets/images/caracas.png") },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={cities}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <CityCard city={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
