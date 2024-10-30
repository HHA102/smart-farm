import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Sensors")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: "#4CAF50",
    fontSize: 16,
  },
});
