import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';

const SettingsView = () => {
    const [userName, setUserName] = useState('John Doe');
    const [userEmail, setUserEmail] = useState('john.doe@example.com');
    const [userPassword, setUserPassword] = useState('password123'); // Use a more secure way to handle passwords in production

    const saveChanges = () => {
        // Here you would typically save the changes to your backend or user defaults
        Alert.alert("Settings Saved", "Your settings have been saved successfully.");
    };

    return (
        <ScrollView style={styles.container}>
            {/* Orange strip at the top */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Settings</Text>
            </View>

            <View style={styles.section}>
                {/* User Information Header */}
                {headerView("User Information")}

                {/* User Name Field */}
                {textFieldView("Name", userName, setUserName)}

                {/* User Email Field */}
                {textFieldView("Email", userEmail, setUserEmail, 'email-address')}

                {/* User Password Field */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        value={userPassword}
                        onChangeText={setUserPassword}
                        secureTextEntry={true}
                    />
                </View>

                {/* Save Changes Button */}
                <TouchableOpacity style={styles.button} onPress={saveChanges}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
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

// User Input TextField View
const textFieldView = (title, value, setValue, keyboardType = 'default') => (
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{title}</Text>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            keyboardType={keyboardType}
        />
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
    inputContainer: {
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
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
});

export default SettingsView;