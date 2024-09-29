// App.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './(tabs)/HomeView'; // Adjust the path as needed
import SettingsScreen from './(tabs)/SettingsView'; // Adjust the path as needed
import AnalyticsScreen from './(tabs)/AnalyticsView'; // Adjust the path as needed
import LearnScreen from './(tabs)/LearnView'; // Adjust the path as needed
import MoreScreen from './(tabs)/MoreView'; // Adjust the path as needed


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Settings" component={SettingsScreen} />
    {/* Add more screens for Analytics if needed */}
  </Stack.Navigator>
);

const AnalyticsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Analytics" component={AnalyticsScreen} />
    {/* Add more screens for Analytics if needed */}
  </Stack.Navigator>
);

// Each tab can have its own stack
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

const LearnStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Learn" component={LearnScreen} />
    {/* Add more screens for Learn if needed */}
  </Stack.Navigator>
);

const MoreStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="More" component={MoreScreen} />
    {/* Add more screens for More if needed */}
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Settings" component={SettingsStack} options={{ headerShown: false }} />
        <Tab.Screen name="Analytics" component={AnalyticsStack} options={{ headerShown: false }} />
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Learn" component={LearnStack} options={{ headerShown: false }} />
        <Tab.Screen name="More" component={MoreStack} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
