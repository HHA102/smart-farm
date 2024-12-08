// import {
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   TouchableOpacity,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// export default function ChartScreen({ navigation }) {
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={24} color="#2E7D32" />
//         </TouchableOpacity>
//         <Text style={styles.title}>Sensor Charts</Text>
//       </View>

//       <ScrollView style={styles.scrollView}>
//         <View style={styles.chartContainer}>
//           {/* Temperature Chart */}
//           <View style={styles.chartCard}>
//             <Text style={styles.chartTitle}>Temperature History</Text>
//             {/* Add your chart component here */}
//             <Text style={styles.placeholder}>
//               Temperature Chart will be displayed here
//             </Text>
//           </View>

//           {/* Humidity Chart */}
//           <View style={styles.chartCard}>
//             <Text style={styles.chartTitle}>Humidity History</Text>
//             {/* Add your chart component here */}
//             <Text style={styles.placeholder}>
//               Humidity Chart will be displayed here
//             </Text>
//           </View>

//           {/* Soil Moisture Chart */}
//           <View style={styles.chartCard}>
//             <Text style={styles.chartTitle}>Soil Moisture History</Text>
//             {/* Add your chart component here */}
//             <Text style={styles.placeholder}>
//               Soil Moisture Chart will be displayed here
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ecf0f1",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "white",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   backButton: {
//     marginRight: 15,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#2E7D32",
//   },
//   scrollView: {
//     flex: 1,
//     padding: 10,
//   },
//   chartContainer: {
//     padding: 5,
//   },
//   chartCard: {
//     backgroundColor: "white",
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.23,
//     shadowRadius: 2.62,
//     elevation: 4,
//   },
//   chartTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 15,
//   },
//   placeholder: {
//     textAlign: "center",
//     color: "#666",
//     padding: 40,
//   },
// });
//----------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ChartScreen = () => {
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Đường dẫn API của Adafruit
    const fetchData = async () => {
      try {
        const response = await fetch('https://io.adafruit.com/api/v2/longthangtran/feeds/iot-temp/data/chart', {
          method: 'GET',
          headers: {
            'X-AIO-Key': process.env.AIO_KEY // Thay thế bằng API Key của bạn
          },
        });

        const result = await response.json();

        // Chuyển đổi dữ liệu thành định dạng phù hợp
        const labels = result.data.map(item => item[0].slice(11, 16)); // Lấy thời gian dạng HH:MM
        const data = result.data.map(item => item[1]); // Giá trị nhiệt độ

        setChartData({
          labels: labels,
          data: [data]  // Dữ liệu cần là mảng mảng
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Temperature Chart</Text>

        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <LineChart
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  data: chartData.data[0] || [],
                  color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`,
                  strokeWidth: 2,
                },
              ],
            }}
            width={screenWidth - 20}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            withDots={true}
            withInnerLines={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray',
    marginTop: 50,
  },
});

export default ChartScreen;
