import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from './src/screens/StartScreen';

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
              </Stack.Navigator>
          </NavigationContainer>
    );
};

export default App;
