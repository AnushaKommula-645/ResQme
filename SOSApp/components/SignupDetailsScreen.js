import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import axios from "axios";

export default function SignupDetailsScreen({ navigation, route }) {
  const { phone, otp } = route.params;

  const [form, setForm] = useState({
    name: "",
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

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup/verify", {
        name: form.name,
        email: form.gmail,
        password: form.password,
        phone,
        emergencyNumbers: [form.emergency1, form.emergency2, form.emergency3],
        otp
      });

      if (res.data.success) {
        alert("Signup successful!");
        navigation.navigate("Login");
      }
    } catch (err) {
      console.log(err);
      alert("Signup failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {["name","password","confirmPassword","age","gmail","place","fatherName","motherName","aadhar","emergency1","emergency2","emergency3"].map((key) => (
          <TextInput
            key={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            style={{ borderWidth:1, borderColor:"#ccc", marginBottom:15, padding:12, borderRadius:8 }}
            secureTextEntry={key.includes("password")}
            keyboardType={["age","aadhar","emergency1","emergency2","emergency3"].includes(key) ? "numeric" : "default"}
            value={form[key]}
            onChangeText={(val) => handleChange(key,val)}
          />
        ))}
        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor:"#044351", padding:15, borderRadius:8 }}>
          <Text style={{ color:"#fff", textAlign:"center", fontWeight:"bold" }}>Submit</Text>
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
