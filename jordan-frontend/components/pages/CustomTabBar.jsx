// app/CustomTabBar.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomTabBar = ({ selectedTab, setSelectedTab }) => {
    return (
        <View style={styles.container}>
            {[0, 1, 2, 3, 4].map((index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.tab}
                    onPress={() => setSelectedTab(index)}
                >
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

const tabTitle = (index) => {
    switch (index) {
        case 0: return 'Settings';
        case 1: return 'Analytics';
        case 2: return 'Home';
        case 3: return 'Learn';
        case 4: return 'More';
        default: return '';
    }
};

const tabIcon = (index) => {
    switch (index) {
        case 0: return 'settings';
        case 1: return 'pie-chart';
        case 2: return 'home';
        case 3: return 'book';
        case 4: return 'ellipsis-horizontal';
        default: return '';
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    tab: {
        alignItems: 'center',
    },
});

export default CustomTabBar;
