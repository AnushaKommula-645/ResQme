import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing } from 'react-native';

const HomeScreen = () => {
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

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <Text style={styles.appName}>ResQme</Text>
      </View>

      {/* Middle SOS Button */}
      <View style={styles.middle}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={styles.sosButton}
            onPress={() => alert('🚨 SOS Activated!')}
          >
            {/* <Image source={require('../assets/Logo.png')} style={styles.sosLogo} /> */}
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  // Top App Bar
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 40,
    backgroundColor: '#59c3b8',
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 10,
    borderRadius: 50,
  },
  appName: {
    fontSize: 33,
    fontWeight: 'bold',
    color: '#fff',
  },

  // Middle SOS button
  middle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosButton: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(89, 195, 184, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
  },
  sosLogo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 110, // same as button radius
    resizeMode: 'cover',
    opacity: 0.15,
  },
  sosText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    zIndex: 1,
  },
});
