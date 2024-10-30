import { useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PumpControlScreen({ navigation }) {
  const [isPumpOn, setIsPumpOn] = useState(false);
  const [isAutomationEnabled, setIsAutomationEnabled] = useState(false);
  const [schedule, setSchedule] = useState({
    morning: true,
    afternoon: false,
    evening: true,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.title}>Pump Control</Text>
      </View>

      {/* Manual Control Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Manual Control</Text>
        <View style={styles.pumpStatus}>
          <Ionicons
            name={isPumpOn ? "water" : "water-outline"}
            size={48}
            color={isPumpOn ? "#4CAF50" : "#666"}
          />
          <Text
            style={[
              styles.statusText,
              { color: isPumpOn ? "#4CAF50" : "#666" },
            ]}
          >
            Pump is {isPumpOn ? "ON" : "OFF"}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isPumpOn ? "#F44336" : "#4CAF50" },
          ]}
          onPress={() => setIsPumpOn(!isPumpOn)}
        >
          <Text style={styles.buttonText}>
            {isPumpOn ? "Turn Off Pump" : "Turn On Pump"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Automation Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Automation Mode</Text>
        <View style={styles.automationContainer}>
          <Text style={styles.automationText}>Enable Automation</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isAutomationEnabled ? "#4CAF50" : "#f4f3f4"}
            onValueChange={() => setIsAutomationEnabled(!isAutomationEnabled)}
            value={isAutomationEnabled}
          />
        </View>

        {isAutomationEnabled && (
          <View style={styles.scheduleContainer}>
            <Text style={styles.scheduleTitle}>Watering Schedule</Text>

            <TouchableOpacity
              style={[
                styles.scheduleItem,
                schedule.morning && styles.scheduleItemActive,
              ]}
              onPress={() =>
                setSchedule({ ...schedule, morning: !schedule.morning })
              }
            >
              <Ionicons
                name="sunny-outline"
                size={24}
                color={schedule.morning ? "white" : "#666"}
              />
              <Text
                style={[
                  styles.scheduleText,
                  schedule.morning && styles.scheduleTextActive,
                ]}
              >
                Morning (6:00 AM)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.scheduleItem,
                schedule.afternoon && styles.scheduleItemActive,
              ]}
              onPress={() =>
                setSchedule({ ...schedule, afternoon: !schedule.afternoon })
              }
            >
              <Ionicons
                name="sunny"
                size={24}
                color={schedule.afternoon ? "white" : "#666"}
              />
              <Text
                style={[
                  styles.scheduleText,
                  schedule.afternoon && styles.scheduleTextActive,
                ]}
              >
                Afternoon (2:00 PM)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.scheduleItem,
                schedule.evening && styles.scheduleItemActive,
              ]}
              onPress={() =>
                setSchedule({ ...schedule, evening: !schedule.evening })
              }
            >
              <Ionicons
                name="moon-outline"
                size={24}
                color={schedule.evening ? "white" : "#666"}
              />
              <Text
                style={[
                  styles.scheduleText,
                  schedule.evening && styles.scheduleTextActive,
                ]}
              >
                Evening (6:00 PM)
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
    color: "#2E7D32",
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
  pumpStatus: {
    alignItems: "center",
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
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
  automationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  automationText: {
    fontSize: 16,
    color: "#333",
  },
  scheduleContainer: {
    marginTop: 20,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 10,
  },
  scheduleItemActive: {
    backgroundColor: "#4CAF50",
  },
  scheduleText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#666",
  },
  scheduleTextActive: {
    color: "white",
  },
});
