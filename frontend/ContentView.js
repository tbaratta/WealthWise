import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomTabBar from './CustomTabBar'; // Import the CustomTabBar
import HomeView from './HomeView';
import SettingsView from './SettingsView';
import AnalyticsView from './AnalyticsView';
import LearnView from './LearnView';
import MoreView from './MoreView';

const ContentView = () => {
    const [selectedTab, setSelectedTab] = useState(2); // Default to Home

    return (
        <View style={styles.container}>
            {/* Switch between views based on the selected tab */}
            {selectedTab === 0 && <SettingsView />}
            {selectedTab === 1 && <AnalyticsView />}
            {selectedTab === 2 && <HomeView />}
            {selectedTab === 3 && <LearnView />}
            {selectedTab === 4 && <MoreView />}

            <CustomTabBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
    },
});

export default ContentView;