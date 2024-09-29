// app/CustomTabBar.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomTabBar = ({ selectedTab, setSelectedTab, navigation }) => {
    const handleTabPress = (index) => {
        setSelectedTab(index);
        switch (index) {
            case 0:
                navigation.navigate('Settings'); // Change this to your Settings screen
                break;
            case 1:
                navigation.navigate('Analytics'); // Change this to your Analytics screen
                break;
            case 2:
                navigation.navigate('Home'); // Ensure your Home view is defined in your Stack
                break;
            case 3:
                navigation.navigate('Learn'); // Navigate to LearnView
                break;
            case 4:
                navigation.navigate('More'); // Change this to your More screen
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.container}>
            {[0, 1, 2, 3, 4].map((index) => (
                <TouchableOpacity key={index} style={styles.tab} onPress={() => handleTabPress(index)}>
                    <Ionicons
                        name={tabIcon(index)}
                        size={20}
                        color={selectedTab === index ? 'orange' : 'gray'}
                    />
                    <Text style={{ color: selectedTab === index ? 'orange' : 'gray' }}>
                        {tabTitle(index)}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

// ... (rest of the CustomTabBar code remains unchanged)

export default CustomTabBar;
