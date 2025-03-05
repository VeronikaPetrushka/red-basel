import React, { useEffect } from 'react';
import { View, Image, Animated } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import InfoScreen from './src/scrns/InfoScreen';
import HomeScreen from './src/scrns/HomeScreen';
import CreateHikeScreen from './src/scrns/CreateHikeScreen';
import PlacesScreen from './src/scrns/PlacesScreen';
import ReadScreen from './src/scrns/ReadScreen';
import SettingsScreen from './src/scrns/SettingsScreen';
import QuestScreen from './src/scrns/QuestScreen';
import MarkPlaceScreen from './src/scrns/MarkPlaceScreen';

enableScreens();

const Stack = createStackNavigator();

const SplashScreen = ({ navigation }) => {
      const progress = new Animated.Value(0);
  
      useEffect(() => {
          Animated.timing(progress, {
              toValue: 100,
              duration: 5000,
              useNativeDriver: false,
          }).start(() => {
              navigation.replace('InfoScreen');
          });
      }, []);
  
      return (
          <View style={{ flex: 1, backgroundColor: '#8f0307', justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('./src/ass/decor/logo-white.png')} style={{ width: 290, height: 77, resizeMode: 'contain', marginBottom: 30 }} />
              
              <View style={{ width: '85%', height: 24, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 24, overflow: 'hidden' }}>
                  <Animated.View style={{
                      width: progress.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
                      height: '100%',
                      backgroundColor: '#cf0000',
                  }} />
              </View>
          </View>
      );
  };

const App = () => {

  return (
          <NavigationContainer>
              <Stack.Navigator initialRouteName={"SplashScreen" }>
                  <Stack.Screen 
                        name="SplashScreen" 
                        component={SplashScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="InfoScreen" 
                        component={InfoScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="HomeScreen" 
                        component={HomeScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="CreateHikeScreen" 
                        component={CreateHikeScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="PlacesScreen" 
                        component={PlacesScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="ReadScreen" 
                        component={ReadScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="SettingsScreen" 
                        component={SettingsScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="QuestScreen" 
                        component={QuestScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="MarkPlaceScreen" 
                        component={MarkPlaceScreen} 
                        options={{ headerShown: false }} 
                  />
              </Stack.Navigator>
          </NavigationContainer>
    );
};

export default App;
