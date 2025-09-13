import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const [editable, setEditable] = useState(false);

  const [user, setUser] = useState({
    name: "Srivalli",
    age: "20",
    gender: "Female",
    gmail: "srivalli@example.com",
    fatherName: "Ravi Kumar",
    motherName: "Lakshmi",
    aadhar: "1234-5678-9012",
    phone: "+91 9876543210",
    emergencyContacts: ["+91 9876543210", "+91 9123456789"],
    address: "123, Main Street, Hyderabad, India",
  });

  const handleChange = (field, value) => setUser({ ...user, [field]: value });

  const handleContactChange = (index, value) => {
    const updatedContacts = [...user.emergencyContacts];
    updatedContacts[index] = value;
    setUser({ ...user, emergencyContacts: updatedContacts });
  };

  const addContact = () =>
    setUser({ ...user, emergencyContacts: [...user.emergencyContacts, ""] });

  const deleteContact = (index) =>
    setUser({
      ...user,
      emergencyContacts: user.emergencyContacts.filter((_, i) => i !== index),
    });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Icon */}
      <View style={styles.profileContainer}>
        <Ionicons name="person-circle-outline" size={120} color="#79d6cb" />
      </View>

      <Text style={styles.heading}>User Profile</Text>

      {/* Input Fields */}
      {[
        { label: "Name", field: "name" },
        { label: "Age", field: "age", keyboardType: "numeric" },
        { label: "Gender", field: "gender" },
        { label: "Email", field: "gmail", keyboardType: "email-address" },
        { label: "Father's Name", field: "fatherName" },
        { label: "Mother's Name", field: "motherName" },
      ].map((item) => (
        <View key={item.field} style={{ marginBottom: 15 }}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput
            style={[styles.input, !editable && styles.disabled]}
            value={user[item.field]}
            onChangeText={(t) => handleChange(item.field, t)}
            editable={editable}
            keyboardType={item.keyboardType || "default"}
          />
        </View>
      ))}

      {/* Aadhaar & Phone (Always Disabled) */}
      {[
        { label: "Aadhaar", value: user.aadhar },
        { label: "Phone", value: user.phone },
      ].map((item) => (
        <View key={item.label} style={{ marginBottom: 15 }}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput style={[styles.input, styles.disabled]} value={item.value} editable={false} />
        </View>
      ))}

      {/* Emergency Contacts */}
      <Text style={styles.label}>Emergency Contacts</Text>
      {user.emergencyContacts.map((contact, index) => (
        <View key={index} style={styles.contactRow}>
          <TextInput
            style={[styles.input, styles.contactInput, !editable && styles.disabled]}
            value={contact}
            onChangeText={(t) => handleContactChange(index, t)}
            editable={editable}
            placeholder="Enter emergency contact"
            keyboardType="phone-pad"
          />
          {editable && (
            <TouchableOpacity onPress={() => deleteContact(index)}>
              <Ionicons name="close-circle" size={28} color="red" />
            </TouchableOpacity>
          )}
        </View>
      ))}

      {editable && (
        <TouchableOpacity style={styles.addBtn} onPress={addContact}>
          <Text style={styles.addBtnText}>+ Add Contact</Text>
        </TouchableOpacity>
      )}

      {/* Address */}
      <View style={{ marginBottom: 15 }}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, !editable && styles.disabled, { height: 80 }]}
          value={user.address}
          onChangeText={(t) => handleChange("address", t)}
          editable={editable}
          multiline
        />
      </View>

      {/* Edit/Save Button */}
      <TouchableOpacity
        style={[editable ? styles.saveBtn : styles.editBtn]}
        onPress={() => setEditable(!editable)}
      >
        <Text style={styles.btnText}>{editable ? "Save" : "Edit"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f8f8",
    flexGrow: 1,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "white",
  },
  disabled: {
    backgroundColor: "#eee",
    color: "gray",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contactInput: {
    flex: 1,
    marginRight: 10,
  },
  editBtn: {
    backgroundColor: "#054453",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  saveBtn: {
    backgroundColor: "#79d6cb",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  addBtn: {
    backgroundColor: "#e0f7f4",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#79d6cb",
  },
  addBtnText: {
    color: "#054453",
    fontSize: 14,
    fontWeight: "600",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
