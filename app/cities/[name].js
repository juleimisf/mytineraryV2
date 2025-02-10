import { View, Text, StyleSheet, Button } from "react-native";
import { useLocalSearchParams , useRouter } from "expo-router";
import { Link } from "expo-router";
import { STRINGS } from "../../components/utils/strings";

export default function CityDetails() {
  const { name } = useLocalSearchParams(); 

  return (
  <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{STRINGS.DETAIL_CITY_NAME} {name}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginTop: 10,
  },
});
