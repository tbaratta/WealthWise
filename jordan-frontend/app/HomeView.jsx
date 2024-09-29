// app/_layout.tsx

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import CustomTabBar from './CustomTabBar'; // Adjust the path as necessary
import LearnView from './LearnView'; // Import your LearnView component
import HomeView from './_layout.tsx'; // Import your HomeView component (if you have it)

const Stack = createNativeStackNavigator();

const Layout = () => {
     const [selectedTab, setSelectedTab] = useState(2); // Default to Home tab (index 2)

     return (
          <NavigationContainer>
               <View style={{ flex: 1 }}>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                         <Stack.Screen name="Home" component={HomeView} /> {/* Your home view */}
                         <Stack.Screen name="Learn" component={LearnView} /> {/* Your learn view */}
                         {/* Add more screens here as needed */}
                    </Stack.Navigator>

                    <CustomTabBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
               </View>
          </NavigationContainer>
     );
};

export default Layout;
