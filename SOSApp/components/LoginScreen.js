import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

const handleLogin = async () => {
  if (username && password) {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: username,
        password
      });
      if (res.data.success) {
        navigation.replace("HomeScreen", { userId: res.data.user._id });
      }
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  } else {
    alert("Enter valid credentials");
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignupOtp")}>
          <Text style={styles.signupLink}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#fff", 
    padding: 20 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 30, 
    color: "#333" 
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    width: "100%", 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 15, 
    backgroundColor: "#f9f9f9" 
  },
  button: { 
    backgroundColor: "#044351", 
    padding: 15, 
    borderRadius: 8, 
    width: "100%", 
    alignItems: "center", 
    marginTop: 10
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 20
  },
  signupText: {
    fontSize: 14,
    color: "#555"
  },
  signupLink: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "bold"
  }
});
