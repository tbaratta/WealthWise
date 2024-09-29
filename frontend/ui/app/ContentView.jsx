import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeView from './components/HomeView';
import SettingsView from './components/SettingsView';
import AnalyticsView from './components/AnalyticsView';
import LearnView from './components/LearnView';
import MoreView from './components/MoreView';
import CustomTabBar from './components/CustomTabBar';

const ContentView = () => {
  const [selectedTab, setSelectedTab] = useState(2); // Default to Home

  // Function to render the correct view based on the selected tab
  const renderView = () => {
    switch (selectedTab) {
      case 0:
        return <SettingsView />;
      case 1:
        return <AnalyticsView />;
      case 2:
        return <HomeView />;
      case 3:
        return <LearnView />;
      case 4:
        return <MoreView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <View style={styles.container}>
      {renderView()} {/* Render the selected view */}
      <CustomTabBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} /> {/* Custom Tab Bar */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20, // Add some padding to the bottom
  },
});

export default ContentView;