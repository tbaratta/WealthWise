import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView } from 'react-native';

const MoreView = () => {
    const [fraudDetectionEnabled, setFraudDetectionEnabled] = useState(false); // Toggle state for fraud detection
    const [developerToolsVisible, setDeveloperToolsVisible] = useState(false); // Toggle state for developer tools visibility

    const toggleFraudDetection = () => {
        setFraudDetectionEnabled(previousState => !previousState);
    };

    const toggleDeveloperTools = () => {
        setDeveloperToolsVisible(previousState => !previousState);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Orange strip at the top */}
            <View style={styles.header}>
                <Text style={styles.headerText}>More</Text>
            </View>

            {/* Fraud Detection Section */}
            <View style={styles.section}>
                {headerView("Fraud Detection")}
                <View style={styles.toggleContainer}>
                    <Text style={styles.toggleLabel}>Enable Fraud Detection</Text>
                    <Switch
                        onValueChange={toggleFraudDetection}
                        value={fraudDetectionEnabled}
                    />
                </View>
            </View>

            {/* Developer Tools Section */}
            <View style={styles.section}>
                {headerView("Developer Tools")}
                <TouchableOpacity
                    style={styles.button}
                    onPress={toggleDeveloperTools}
                >
                    <Text style={styles.buttonText}>
                        {developerToolsVisible ? "Hide Developer Tools" : "Show Developer Tools"}
                    </Text>
                </TouchableOpacity>
                {developerToolsVisible && (
                    <View style={styles.developerTools}>
                        {/* Developer Tools Content Goes Here */}
                        <Text>Developer Tool 1</Text>
                        <Text>Developer Tool 2</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

// Custom Header View
const headerView = (title) => (
    <View style={styles.headerSection}>
        <Text style={styles.headerSectionText}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: 'orange',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    section: {
        marginVertical: 10,
        marginHorizontal: 16,
        padding: 16,
        backgroundColor: 'lightgray',
        borderRadius: 10,
        elevation: 1, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    toggleLabel: {
        fontSize: 18,
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    developerTools: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    headerSection: {
        backgroundColor: 'orange',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerSectionText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default MoreView;