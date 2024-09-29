import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';

const SettingsView = () => {
    const [userName, setUserName] = useState('John Doe');
    const [userEmail, setUserEmail] = useState('john.doe@example.com');
    const [userPassword, setUserPassword] = useState('password123'); // Use a more secure way to handle passwords in production

    const saveChanges = () => {
        // Input validation
        if (!userEmail.includes('@')) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }
        if (userPassword.length < 6) {
            Alert.alert("Weak Password", "Password must be at least 6 characters long.");
            return;
        }

        // Here you would typically save the changes to your backend or user defaults
        Alert.alert("Settings Saved", "Your settings have been saved successfully.");
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Settings</Text>
            </View>

            <View style={styles.section}>
                {headerView("User Information")}

                {textFieldView("Name", userName, setUserName)}
                {textFieldView("Email", userEmail, setUserEmail, 'email-address')}

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        value={userPassword}
                        onChangeText={setUserPassword}
                        secureTextEntry={true}
                        accessibilityLabel="Password Input"
                    />
                </View>

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
            accessibilityLabel={`${title} Input`}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: '#FF4500', // Match the orange color to the home screen
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
    headerSection: {
        backgroundColor: '#FF4500', // Match the orange color to the home screen
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
        backgroundColor: 'white',
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
