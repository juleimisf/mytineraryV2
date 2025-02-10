import { View, FlatList, StyleSheet } from "react-native";
import CityCard from "../../components/CityCard/CityCard"
import { cities } from "../../components/data/cities";

export default function Cities() {

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
    paddingVertical: 20,
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "#f8f8f8",
  }
});