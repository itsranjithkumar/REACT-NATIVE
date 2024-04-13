import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import React from "react";

const Homescreen = () => {
  return (
    <SafeAreaView
      style={{
        paddinTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Text>Homescreen</Text>
    </SafeAreaView>
  );
};

export default Homescreen;

const styles = StyleSheet.create({});
