import {
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ChartScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.title}>Sensor Charts</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.chartContainer}>
          {/* Temperature Chart */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Temperature History</Text>
            {/* Add your chart component here */}
            <Text style={styles.placeholder}>
              Temperature Chart will be displayed here
            </Text>
          </View>

          {/* Humidity Chart */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Humidity History</Text>
            {/* Add your chart component here */}
            <Text style={styles.placeholder}>
              Humidity Chart will be displayed here
            </Text>
          </View>

          {/* Soil Moisture Chart */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Soil Moisture History</Text>
            {/* Add your chart component here */}
            <Text style={styles.placeholder}>
              Soil Moisture Chart will be displayed here
            </Text>
          </View>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
    padding: 10,
  },
  chartContainer: {
    padding: 5,
  },
  chartCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  placeholder: {
    textAlign: "center",
    color: "#666",
    padding: 40,
  },
});
