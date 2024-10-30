import {
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install expo/vector-icons

export default function SensorScreen({ navigation }) {
  const sensorData = [
    {
      id: 1,
      name: "Temperature",
      value: "28°C",
      icon: "thermometer-outline",
      status: "Normal",
    },
    {
      id: 2,
      name: "Humidity",
      value: "65%",
      icon: "water-outline",
      status: "High",
    },
    {
      id: 3,
      name: "Soil Moisture",
      value: "45%",
      icon: "leaf-outline",
      status: "Normal",
    },
    {
      id: 4,
      name: "Light Intensity",
      value: "850 lux",
      icon: "sunny-outline",
      status: "Normal",
    },
    {
      id: 5,
      name: "pH Level",
      value: "6.5",
      icon: "flask-outline",
      status: "Normal",
    },
    {
      id: 6,
      name: "CO2 Level",
      value: "410 ppm",
      icon: "cloud-outline",
      status: "Normal",
    },
    {
      id: 7,
      name: "Wind Speed",
      value: "12 km/h",
      icon: "wind-outline",
      status: "Normal",
    },
    {
      id: 8,
      name: "Rainfall",
      value: "2.5 mm",
      icon: "rainy-outline",
      status: "Low",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sensor Data</Text>
        <Text style={styles.subtitle}>
          Last Updated: {new Date().toLocaleTimeString()}
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.gridContainer}>
          {sensorData.map((sensor) => (
            <View key={sensor.id} style={styles.card}>
              <Ionicons name={sensor.icon} size={32} color="#4CAF50" />
              <Text style={styles.sensorName}>{sensor.name}</Text>
              <Text style={styles.sensorValue}>{sensor.value}</Text>
              <Text
                style={[
                  styles.sensorStatus,
                  {
                    color:
                      sensor.status === "Normal"
                        ? "#4CAF50"
                        : sensor.status === "High"
                        ? "#FF9800"
                        : "#F44336",
                  },
                ]}
              >
                {sensor.status}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.chartButton]}
            onPress={() => navigation.navigate("Charts")}
          >
            <Ionicons name="bar-chart-outline" size={24} color="white" />
            <Text style={styles.buttonText}>View Charts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.pumpButton]}
            onPress={() => navigation.navigate("PumpControl")}
          >
            <Ionicons name="water-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Pump Control</Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
    padding: 10,
    marginBottom: 0,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  sensorName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  sensorValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    color: "#2E7D32",
  },
  sensorStatus: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "500",
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartButton: {
    backgroundColor: "#4CAF50",
  },
  pumpButton: {
    backgroundColor: "#2E7D32",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
});
