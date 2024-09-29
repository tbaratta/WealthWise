import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const frontendIp = '10.0.2.2:3000'; // Make sure this matches your backend URL
const userId = '1';

const MoreView = () => {
    const [fraudDetectionEnabled, setFraudDetectionEnabled] = useState(false);
    const [developerToolsVisible, setDeveloperToolsVisible] = useState(false);
    const [latestTransaction, setLatestTransaction] = useState({ amount: null, category: null });

    // Fetch the latest transaction when the component mounts
    useEffect(() => {
        fetchLatestTransaction();
    }, []);

    const toggleFraudDetection = () => {
        const newValue = !fraudDetectionEnabled;
        setFraudDetectionEnabled(newValue);
        Alert.alert(`Fraud Detection is now ${newValue ? "enabled" : "disabled"}`);
    };

    const toggleDeveloperTools = () => {
        setDeveloperToolsVisible(previousState => !previousState);
    };

    // Fetch the latest transaction from the backend
    const fetchLatestTransaction = async () => {
        try {
            const response = await axios.get(`http://${frontendIp}/more`); // Ensure this is correct
            setLatestTransaction(response.data);
        } catch (error) {
            console.error('Error fetching latest transaction:', error);
            Alert.alert('Error', 'Failed to fetch latest transaction');
        }
    };

    // Post a fake transaction to the backend
    const postFakeTransaction = async () => {
        const fakeTransaction = {
            userId: userId, // Include user ID
            amount: Math.floor(Math.random() * 100), // Random amount for the transaction
            category: 'Food', // Example category
            date: new Date().toISOString(), // Current date
        };

        try {
            const response = await axios.post(`http://${frontendIp}/more/${userId}`, fakeTransaction);
            console.log('Posted Fake Transaction:', response.data);
            fetchLatestTransaction(); // Refresh the latest transaction after posting
            Alert.alert('Success', 'Fake transaction added successfully');
        } catch (error) {
            console.error('Error posting fake transaction:', error.response?.data || error);
            Alert.alert('Error', 'Failed to add fake transaction');
        }
    };


    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>More</Text>
            </View>

            <View style={styles.section}>
                {headerView("Fraud Detection")}
                <View style={styles.toggleContainer}>
                    <Text style={styles.toggleLabel}>Enable Fraud Detection</Text>
                    <Switch
                        onValueChange={toggleFraudDetection}
                        value={fraudDetectionEnabled}
                        accessibilityLabel="Enable Fraud Detection Switch"
                    />
                </View>
            </View>

            <View style={styles.section}>
                {headerView("Latest Transaction")}
                <Text>Amount: {latestTransaction.amount !== null ? `$${latestTransaction.amount}` : "Loading..."}</Text>
                <Text>Category: {latestTransaction.category || "Loading..."}</Text>
                <TouchableOpacity style={styles.button} onPress={postFakeTransaction} accessibilityLabel="Post Fake Transaction">
                    <Text style={styles.buttonText}>Add Fake Transaction</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                {headerView("Developer Tools")}
                <TouchableOpacity
                    style={styles.button}
                    onPress={toggleDeveloperTools}
                    accessibilityLabel="Toggle Developer Tools"
                >
                    <Text style={styles.buttonText}>
                        {developerToolsVisible ? "Hide Developer Tools" : "Show Developer Tools"}
                    </Text>
                </TouchableOpacity>
                {developerToolsVisible && (
                    <View style={styles.developerTools}>
                        <Text>Developer Tool 1</Text>
                        <Text>Developer Tool 2</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

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
        elevation: 1,
        shadowColor: '#000',
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
