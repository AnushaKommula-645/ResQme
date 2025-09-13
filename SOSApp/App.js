import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignupOtpScreen from "./components/SignupOtpScreen";
import SignupDetailsScreen from "./components/SignupDetailsScreen";
import LoginScreen from "./components/LoginScreen";
import Splash from "./components/logo";
import LandScreen from "./components/LandScreen";
import MainTabs from "./components/MainTabs";  // 👈 use this
import Profile from "./components/profile";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="LandScreen" component={LandScreen} />
        <Stack.Screen name="SignupOtp" component={SignupOtpScreen} />
        <Stack.Screen name="SignupDetails" component={SignupDetailsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={MainTabs} /> 
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
