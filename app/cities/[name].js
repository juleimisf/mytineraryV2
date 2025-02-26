import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { STRINGS } from "../../src/components/utils/strings"

export default function CityDetail() {
  const city = useLocalSearchParams();

  if (!city) {
    return <Text style={styles.error}>{STRINGS.ERROR_RESULT_CONTENT}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: city.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{city.name}</Text>
        <Text style={styles.subtitle}>{city.country}</Text>
        <Text style={styles.description}>{city.description}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>🌍 {STRINGS.LANGUAGE_TITLE}: </Text>
          <Text style={styles.value}>{city.language}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>💰 {STRINGS.CURRENCY_TITLE}: </Text>
          <Text style={styles.value}>{city.currency}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>⭐ {STRINGS.QUALIFICATION_TITLE}: </Text>
          <Text style={styles.value}>{city.averageRating} / 5</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  image: {
    width: "100%",
    height: 250,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    color: "#777",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: "#555",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
  noData: {
    fontSize: 16,
    color: "#888",
    marginTop: 10,
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
