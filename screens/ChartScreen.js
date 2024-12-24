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
import { AIO_KEY } from '@env';

const screenWidth = Dimensions.get('window').width;
const ChartScreen = () => {
  const [dataSets, setDataSets] = useState({
    temp: { labels: [], data: [] },
    soilMoisture: { labels: [], data: [] },
    light: { labels: [], data: [] },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm fetchData với các kiểm tra dữ liệu hợp lệ
  const fetchData = async (feed) => {
    try {
      const response = await fetch(
        `https://io.adafruit.com/api/v2/longthangtran/feeds/${feed}/data/chart`,
        {
          method: 'GET',
          headers: {
            'X-AIO-Key': AIO_KEY, // Sử dụng API Key đúng
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data for feed: ${feed}`);
      }
  
      const result = await response.json();
      console.log('API Response:', result); // Debug API Response
  
      // Kiểm tra nếu dữ liệu trả về có đúng định dạng không
      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        const labels = result.data.map((item) => {
          // Chuyển đổi thời gian từ UTC sang giờ địa phương
          const utcDate = new Date(item[0]); // item[0] là thời gian UTC
          return utcDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        });
  
        const data = result.data.map((item) => parseFloat(item[1] || 0)); // Chuyển giá trị sang số thực
        return { labels, data };
      } else {
        // Nếu dữ liệu không hợp lệ hoặc mảng data rỗng
        return { labels: ['No data'], data: [0] }; // Trả về dữ liệu mặc định
      }
    } catch (error) {
      console.error(`Error fetching data for ${feed}:`, error);
      setError(`Failed to load data for ${feed}`);
      return { labels: ['Error'], data: [0] }; // Trả về dữ liệu lỗi
    }
  };

  // Hàm fetchAllData để lấy tất cả dữ liệu từ các feed
  const fetchAllData = async () => {
    setLoading(true);
    setError(null);

    const tempData = await fetchData('iot-temp');
    const soilMoistureData = await fetchData('iot-soil-moisture');
    const lightData = await fetchData('iot-light');

    setDataSets({
      temp: tempData,
      soilMoisture: soilMoistureData,
      light: lightData,
    });

    setLoading(false);
  };

  // Gọi fetchAllData khi component được mount
  useEffect(() => {
    fetchAllData();
  }, []);

  // Hàm render Chart nếu có dữ liệu hợp lệ
  const renderChart = (title, data) => {
    // Kiểm tra dữ liệu trước khi render chart
    if (data.labels.length === 0 || data.data.length === 0) {
      return <Text style={styles.errorText}>No data available for {title}</Text>;
    }

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{title}</Text>
        <LineChart
          data={{
            labels: data.labels,
            datasets: [
              {
                data: data.data,
                color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`, // Màu của line chart
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
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Sensor Charts</Text>

        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            {renderChart('Temperature', dataSets.temp)}
            {renderChart('Soil Moisture', dataSets.soilMoisture)}
            {renderChart('Light Intensity', dataSets.light)}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  chartContainer: {
    marginBottom: 30,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
  },
});

export default ChartScreen;


