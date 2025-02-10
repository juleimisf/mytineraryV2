import { View, Text, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";


export default function CityCard({ city }) {
  return (
    <Link href={`/cities/${city.name}`}>
      <View style={styles.card}>
      <Image source={city.image} style={styles.image} />
      <Text style={styles.name}>{city.name}</Text>
    </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 250,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
});