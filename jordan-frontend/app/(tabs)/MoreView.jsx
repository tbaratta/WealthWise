import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const frontendIp = '10.0.2.2:3000';
const userId = '1';

const MoreView = () => {
    const [fraudDetectionEnabled, setFraudDetectionEnabled] = useState(true); // Default to on
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

    // Fetch the latest transaction from the backend
    const fetchLatestTransaction = async () => {
        try {
            const response = await axios.get(`http://${frontendIp}/more`); // Frontend URL
            setLatestTransaction(response.data);
        } catch (error) {
            console.error('Error fetching latest transaction:', error);
            Alert.alert('Error', 'Failed to fetch latest transaction');
        }
    };

    // Post a fake transaction to the backend
    const postFakeTransaction = async () => {
        try {
            await axios.post(`http://${frontendIp}/more/${userId}`); // Frontend URL
            fetchLatestTransaction(); // Refresh the latest transaction after posting
            Alert.alert('Success', 'Fake transaction added successfully');
        } catch (error) {
            console.error('Error posting fake transaction:', error);
            Alert.alert('Error', 'Failed to add fake transaction');
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Fraud Detection Section */}
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Fraud Detection</Text>
                <View style={styles.toggleContainer}>
                    <Text style={styles.toggleLabel}>Enable Fraud Detection</Text>
                    <Switch
                        onValueChange={toggleFraudDetection}
                        value={fraudDetectionEnabled}
                        accessibilityLabel="Enable Fraud Detection Switch"
                    />
                </View>
            </View>

            {/* Dev Tools Section */}
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Dev Tools</Text>

                <TouchableOpacity style={styles.button} onPress={postFakeTransaction} accessibilityLabel="Post Fake Transaction">
                    <Text style={styles.buttonText}>Add Fake Transaction</Text>
                </TouchableOpacity>

                <View style={styles.transactionInfo}>
                    <Text style={styles.transactionLabel}>Latest Transaction:</Text>
                    <Text style={styles.transactionDetails}>
                        Amount: {latestTransaction.amount !== null ? `$${latestTransaction.amount}` : "Loading..."}
                    </Text>
                    <Text style={styles.transactionDetails}>
                        Category: {latestTransaction.category || "Loading..."}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    section: {
        marginVertical: 10,
        marginHorizontal: 16,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        borderColor: '#FF4500', // Orange border
        borderWidth: 1,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF4500', // Orange color
        marginBottom: 10,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f7f7f7', // Light gray background for the toggle
        borderRadius: 10,
    },
    toggleLabel: {
        fontSize: 18,
    },
    button: {
        backgroundColor: '#FF4500', // Orange button
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
    transactionInfo: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f7f7f7', // Light gray background for transaction info
        borderRadius: 10,
    },
    transactionLabel: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    transactionDetails: {
        fontSize: 14,
    },
});

export default MoreView;
