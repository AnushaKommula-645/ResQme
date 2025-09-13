import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function SignupOtpScreen() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigation = useNavigation();

  const sendOtp = async () => {
    if (mobile.length === 10) {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/signup/send-otp", { phone: "+91" + mobile });
        if (res.data.success) {
          setOtpSent(true);
          alert("OTP sent!");
        }
      } catch (err) {
        console.log(err);
        alert("Failed to send OTP");
      }
    } else {
      alert("Enter valid mobile number");
    }
  };

  const verifyOtp = async () => {
    if (otp.length === 6) {
      navigation.navigate("SignupDetails", { phone: "+91" + mobile, otp });
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      {!otpSent ? (
        <TextInput
          placeholder="Enter Mobile Number"
          keyboardType="numeric"
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
        />
      ) : (
        <TextInput
          placeholder="Enter OTP"
          keyboardType="numeric"
          style={styles.input}
          value={otp}
          onChangeText={setOtp}
        />
      )}

      {!otpSent ? (
        <TouchableOpacity style={styles.button} onPress={sendOtp}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={verifyOtp}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
      )}
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
  loginContainer: {
    flexDirection: "row",
    marginTop: 20
  },
  loginText: {
    fontSize: 14,
    color: "#555"
  },
  loginLink: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "bold"
  }
});
