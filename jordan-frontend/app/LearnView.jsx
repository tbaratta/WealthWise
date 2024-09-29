import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

const LearnView = () => {
    const [selectedModule, setSelectedModule] = useState(null); // Track which module is expanded
    const [isChatExpanded, setIsChatExpanded] = useState(false); // State for chatbot expansion

    const links = (module) => {
        switch (module) {
            case "Credit":
                return ["Credit Basics Video", "Credit Management Test", "Credit Score Tips"];
            case "Insurance":
                return ["Insurance 101 Video", "Insurance Knowledge Test", "Types of Insurance"];
            case "Loans":
                return ["Understanding Loans Video", "Loan Application Test", "Loan Repayment Tips"];
            case "Savings":
                return ["Savings Strategies Video", "Savings Challenge Test", "How to Save Effectively"];
            default:
                return [];
        }
    };

    const moduleView = (title) => (
        <View>
            <TouchableOpacity style={styles.moduleButton} onPress={() => {
                setSelectedModule(selectedModule === title ? null : title);
            }}>
                <Text style={styles.moduleButtonText}>{title}</Text>
            </TouchableOpacity>
            {selectedModule === title && (
                <View style={styles.linksContainer}>
                    {links(title).map((link, index) => (
                        <Text key={index} style={styles.linkText}>{link}</Text>
                    ))}
                </View>
            )}
        </View>
    );

    const chatbotModule = () => (
        <View style={styles.chatbotContainer}>
            {!isChatExpanded ? (
                <TouchableOpacity style={styles.chatButton} onPress={() => setIsChatExpanded(true)}>
                    <Text style={styles.chatButtonText}>💬 Chat with me!</Text>
                </TouchableOpacity>
            ) : (
                fullScreenChatView()
            )}
        </View>
    );

    const fullScreenChatView = () => (
        <View style={styles.fullChatContainer}>
            <View style={styles.chatHeader}>
                <Text style={styles.chatHeaderText}>WealthWise AI Chatbot</Text>
            </View>
            <ScrollView style={styles.chatArea}>
                <Text>User: What can I learn about savings?</Text>
                <Text>WealthWise AI: You can explore various tips and tricks to save effectively...</Text>
                {/* Add more chat messages here */}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputField}
                    placeholder="Ask me a question..."
                    placeholderTextColor="gray"
                />
                <TouchableOpacity style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Learn</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {moduleView("Credit")}
                {moduleView("Insurance")}
                {moduleView("Loans")}
                {moduleView("Savings")}
                {chatbotModule()}
            </ScrollView>
        </View>
    );
};

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
    scrollContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    moduleButton: {
        backgroundColor: 'orange',
        padding: 12,
        borderRadius: 8,
        marginVertical: 5,
        width: '100%',
    },
    moduleButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
    },
    linksContainer: {
        backgroundColor: 'lightgray',
        borderRadius: 8,
        padding: 8,
        marginBottom: 10,
    },
    linkText: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    chatbotContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    chatButton: {
        backgroundColor: 'blue',
        padding: 16,
        borderRadius: 10,
    },
    chatButtonText: {
        color: 'white',
        fontSize: 20,
    },
    fullChatContainer: {
        width: '100%',
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
    },
    chatHeader: {
        marginBottom: 10,
    },
    chatHeaderText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    chatArea: {
        flex: 1,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputField: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 10,
    },
    sendButtonText: {
        color: 'white',
    },
});

export default LearnView;