import { useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LightControlScreen({ navigation }) {
  const [isLightOn, setIsLightOn] = useState(false);

  const toggleLight = async () => {
    try {
      const apiUrl = 'https://io.adafruit.com/api/v2/longthangtran/feeds/iot-led/data';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-AIO-Key': 'aio_nwYF43EkIoi4KGtLDr7gZccfb04C',
        },
        body: JSON.stringify({ value: isLightOn ? "0" : "1" }),
      });

      if (response.ok) {
        setIsLightOn(!isLightOn);
      } else {
        console.error("Failed to toggle light");
      }
    } catch (error) {
      console.error("Error toggling light:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFD700" />
        </TouchableOpacity>
        <Text style={styles.title}>Light Control</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Manual Control</Text>
        <View style={styles.lightStatus}>
          <Ionicons
            name={isLightOn ? "bulb" : "bulb-outline"}
            size={48}
            color={isLightOn ? "#FFD700" : "#666"}
          />
          <Text
            style={[styles.statusText, { color: isLightOn ? "#FFD700" : "#666" }]}
          >
            Light is {isLightOn ? "ON" : "OFF"}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: isLightOn ? "#F44336" : "#FFD700" }]}
          onPress={toggleLight}
        >
          <Text style={styles.buttonText}>
            {isLightOn ? "Turn Off Light" : "Turn On Light"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
  },
  section: {
    backgroundColor: "white",
    margin: 10,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  lightStatus: {
    alignItems: "center",
    marginBottom: 20,
  },
  statusText: { 
    fontSize: 16,fontWeight: "bold",
    marginTop: 10,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});