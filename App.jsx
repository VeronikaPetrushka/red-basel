import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
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

const loaders = [
    require('./src/ass/loaders/2.jpg'),
    require('./src/ass/loaders/1.jpg'),
  ];

const App = () => {
    const [currentLoader, setCurrentLoader] = useState(0);
    const slideAnimation1 = useRef(new Animated.Value(0)).current;
    const slideAnimation2 = useRef(new Animated.Value(Dimensions.get('window').width)).current;

    useEffect(() => {
          const animationTimeout = setTimeout(() => {
          slideToNextLoader();
    }, 1500);

    const navigation = setTimeout(() => {
          navigateToMenu();
          }, 4000);

          return () => {
                clearTimeout(animationTimeout);
                clearTimeout(navigation);
          };
    }, []);

    const slideToNextLoader = () => {
          Animated.parallel([
          Animated.timing(slideAnimation1, {
                toValue: -Dimensions.get('window').width,
                duration: 1500,
                useNativeDriver: true,
          }),
          Animated.timing(slideAnimation2, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true,
                }),
          ]).start(() => {
                setCurrentLoader(1);
          });
    };

    const navigateToMenu = () => {
          setCurrentLoader(2);
    };

  return (
          <NavigationContainer>
              <Stack.Navigator
                  screenOptions={{
                  headerShown: false,
                  animation: 'fade',
                  animationDuration: 1000,
                }}>
                  {currentLoader < 2 ? (
                        <Stack.Screen name="Welcome" options={{ headerShown: false }}>
                        {() => (
                        <View style={{ flex: 1, backgroundColor: '#000' }}>
                              <Animated.Image
                                    source={loaders[0]}
                                    style={[
                                    { 
                                          width: '100%', 
                                          height: '100%', 
                                          position: 'absolute',
                                    },
                                    { 
                                          transform: [{ translateX: slideAnimation1 }],
                                    },
                                    ]}
                              />
                              <Animated.Image
                                    source={loaders[1]}
                                    style={[
                                    { 
                                          width: '100%', 
                                          height: '100%', 
                                          position: 'absolute',
                                    },
                                    { 
                                          transform: [{ translateX: slideAnimation2 }],
                                    },
                                    ]}
                              />
                        </View>
                        )}
                        </Stack.Screen>
                  ) : (
                        <Stack.Screen 
                              name="InfoScreen" 
                              component={InfoScreen} 
                              options={{ headerShown: false }} 
                        />
                  )}        
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
