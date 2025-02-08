import { View, Text, StyleSheet, Button } from "react-native";
import { useLocalSearchParams , useRouter } from "expo-router";

export default function CityDetails() {
  const { name } = useLocalSearchParams(); 
  const router = useRouter(); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>Welcome to {name}!</Text>
      <Button title="Back to Cities" onPress={() => router.back()} />  
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
