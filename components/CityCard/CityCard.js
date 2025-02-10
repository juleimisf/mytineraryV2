import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function CityCard({ city }) {
  const router = useRouter();

  return (
    <TouchableOpacity 
      onPress={() => router.push(`/cities/${city.name}`)}
      activeOpacity={0.8}
    >
      <View style={styles.card}>
        <Image source={city.image} style={styles.image} />
        <Text style={styles.name} accessible={true}>{city.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
});