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
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 15,
  },
  list: {
    paddingBottom: 20,
  },
});