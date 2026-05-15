import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>StartupHub - Servicios para Startups Venezolanas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16213e",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    color: "#e0e0e0",
    fontSize: 18,
    textAlign: "center",
  },
});
