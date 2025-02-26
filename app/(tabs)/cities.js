import { View, FlatList, Keyboard, ActivityIndicator, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import CityCard from "../../src/components/CityCard/CityCard";
import NoResults from "../../src/components/NoResults";
import SearchBar from "../../src/components/SearchBar";
import useFetchCities from "../../src/hooks/useFetchCities";

function Cities() {
  const { cities, loading, error } = useFetchCities(); 
  const [filteredCities, setFilteredCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setFilteredCities(cities);
  }, [cities]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === "") {
      setFilteredCities(cities);
    } else {
      const filtered = cities.filter((city) =>
        city.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredCities(cities);
    Keyboard.dismiss();
  };
  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} onClear={clearSearch} />

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : error ? (
        <NoResults />
      ) : filteredCities.length === 0 ? (
        <NoResults />
      ) : (
        <FlatList
          data={filteredCities}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => <CityCard city={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 15,
  },
  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  noResults: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Cities

