import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import defaultImage from "../../assets/error-connection.png"

const ApiError = ({ message = "Error de conexión con la API" }) => {
    return (
        <View style={styles.container}>
            <Image source={defaultImage} style={styles.image} />
            <Text style={styles.errorText}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: "contain",
    },
    errorText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFF",
        textAlign: "center",
        marginTop: 10,
    },
});

export default ApiError;
