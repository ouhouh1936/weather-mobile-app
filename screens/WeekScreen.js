import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Weekscreen = () => {
  return (
    <View style={styles.container}>
      <Text>Week</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Weekscreen;
