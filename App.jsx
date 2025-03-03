import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from './src/screens/StartScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateHikeScreen from './src/screens/CreateHikeScreen';
import PlacesScreen from './src/screens/PlacesScreen';
import ReadScreen from './src/screens/ReadScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import QuestScreen from './src/screens/QuestScreen';

enableScreens();

const Stack = createStackNavigator();

const App = () => {

  return (
          <NavigationContainer>
              <Stack.Navigator initialRouteName={"StartScreen" }>
                  <Stack.Screen 
                        name="StartScreen" 
                        component={StartScreen} 
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
              </Stack.Navigator>
          </NavigationContainer>
    );
};

export default App;
