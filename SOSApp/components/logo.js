import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Logo scaling animation
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Fade + slide animation
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        delay: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(logoTranslateY, {
        toValue: 0,
        duration: 1000,
        delay: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('LandScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, scaleAnim, logoOpacity, logoTranslateY]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/Logo.png')} // 👈 replace with your logo file
        style={[
          styles.logo,
          {
            opacity: logoOpacity,
            transform: [
              { translateY: logoTranslateY },
              { scale: scaleAnim },
            ],
          },
        ]}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  logo: { width: 200, height: 200, resizeMode: 'contain' },
});


//splash.js