import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";

export default function SignupDetailsScreen({ navigation }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    age: "",
    gmail: "",
    place: "",
    fatherName: "",
    motherName: "",
    aadhar: "",
    emergency1: "",
    emergency2: "",
    emergency3: ""
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Signup successful!");
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>User Details</Text>

        {[
          { key: "username", placeholder: "Username" },
          { key: "password", placeholder: "Password", secure: true },
          { key: "confirmPassword", placeholder: "Confirm Password", secure: true },
          { key: "age", placeholder: "Age", keyboard: "numeric" },
          { key: "gmail", placeholder: "Gmail" },
          { key: "place", placeholder: "Place" },
          { key: "fatherName", placeholder: "Father's Name" },
          { key: "motherName", placeholder: "Mother's Name" },
          { key: "aadhar", placeholder: "Aadhar Number", keyboard: "numeric" },
          { key: "emergency1", placeholder: "Emergency Contact 1", keyboard: "numeric" },
          { key: "emergency2", placeholder: "Emergency Contact 2", keyboard: "numeric" },
          { key: "emergency3", placeholder: "Emergency Contact 3", keyboard: "numeric" }
        ].map((field) => (
          <TextInput
            key={field.key}
            placeholder={field.placeholder}
            style={styles.input}
            secureTextEntry={field.secure}
            keyboardType={field.keyboard || "default"}
            value={form[field.key]}
            onChangeText={(val) => handleChange(field.key, val)}
          />
        ))}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: "#fff", 
    flexGrow: 1,
    justifyContent: "center" 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 25, 
    textAlign: "center", 
    color: "#333" 
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 15, 
    backgroundColor: "#f9f9f9" 
  },
  button: { 
    backgroundColor: "#044351", 
    padding: 15, 
    borderRadius: 8, 
    alignItems: "center", 
    marginTop: 10
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  }
});
