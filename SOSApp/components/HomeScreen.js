import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import axios from 'axios'; // <-- Added
import * as Location from 'expo-location';

const HomeScreen = ({ userId }) => { // <-- pass userId as prop
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]).start(() => pulse());
    };
    pulse();
  }, [pulseAnim]);

  
    const sendSOS = async () => {
        try {
            // Request permission
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
            alert('Permission to access location denied!');
            return;
            }

            // Get current location
            let location = await Location.getCurrentPositionAsync({});
            const coords = `${location.coords.latitude},${location.coords.longitude}`;

            // Send SOS to backend
            const res = await axios.post("http://localhost:5000/api/sos", {
            userId: userId,
            location: coords
            });

            if (res.data.success) alert("SOS sent!");
        } catch (err) {
            console.log(err);
            alert("Failed to send SOS");
        }
    };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <Text style={styles.appName}>ResQme</Text>
      </View>

      <View style={styles.middle}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={styles.sosButton}
            onPress={sendSOS}
          >
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default HomeScreen;
