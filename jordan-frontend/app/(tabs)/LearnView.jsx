import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

const LearnView = () => {
    const [selectedModule, setSelectedModule] = useState(null);
    const [isChatExpanded, setIsChatExpanded] = useState(false);
    const [messages, setMessages] = useState([]); // State for chat messages
    const [inputText, setInputText] = useState(""); // State for input text

    const links = (module) => {
        switch (module) {
            case "Credit":
                return ["Credit Basics Video", "Credit Management Test", "Credit Score Tips"];
            case "Insurance":
                return ["Insurance 101 Video", "Insurance Knowledge Test", "Types of Insurance"];
            case "Loans":
                return ["Understanding Loans Video", "Loan Application Test", "Loan Repayment Tips"];
            default:
                return [];
        }
    };

    const moduleView = (title) => (
        <View style={styles.moduleContainer}>
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

    const handleSendMessage = () => {
        if (inputText.trim() === "") return; // Prevent sending empty messages
        // Add user message
        setMessages((prevMessages) => [...prevMessages, { user: "User", text: inputText }]);
        setInputText(""); // Clear input

        // Simulate bot response after a delay
        setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, { user: "WealthWise AI", text: "That's interesting! Tell me more..." }]);
        }, 1000);
    };

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
                {messages.map((msg, index) => (
                    <Text key={index} style={[styles.messageText, { alignSelf: msg.user === "User" ? 'flex-end' : 'flex-start' }]}>
                        {msg.user}: {msg.text}
                    </Text>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputField}
                    placeholder="Ask me a question..."
                    placeholderTextColor="gray"
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={handleSendMessage} // Send on Enter key
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
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
                {chatbotModule()}
            </ScrollView>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // Changed to white
        padding: 20,
    },
    header: {
        backgroundColor: 'orange', // Changed header to orange
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    headerText: {
        color: 'white', // Changed header text color to white
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    moduleContainer: {
        marginBottom: 10,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    moduleButton: {
        padding: 15,
        backgroundColor: 'orange', // Changed module button color to orange
    },
    moduleButtonText: {
        color: 'white', // Changed module button text color to white
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    linksContainer: {
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    linkText: {
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
    },
    chatbotContainer: {
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center',
    },
    chatButton: {
        padding: 10,
        backgroundColor: 'orange', // Changed chat button color to orange
        borderRadius: 8,
        alignItems: 'center',
    },
    chatButtonText: {
        color: 'white', // Changed chat button text color to white
        fontSize: 18,
    },
    fullChatContainer: {
        borderWidth: 1,
        borderColor: 'orange', // Changed border color to orange
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        width: '100%',
        height: '70%', // Increased height for larger chatbot view
        justifyContent: 'space-between',
    },
    chatHeader: {
        backgroundColor: 'orange', // Changed chat header color to orange
        padding: 10,
    },
    chatHeaderText: {
        color: 'white', // Changed chat header text color to white
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    chatArea: {
        flex: 1,
        padding: 10,
    },
    messageText: {
        padding: 5,
        marginVertical: 2,
        borderRadius: 5,
        backgroundColor: '#f1f1f1',
        maxWidth: '80%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    inputField: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#ffffff',
        marginRight: 5,
    },
    sendButton: {
        backgroundColor: 'orange', // Changed send button color to orange
        borderRadius: 5,
        padding: 10,
    },
    sendButtonText: {
        color: 'white', // Changed send button text color to white
        fontWeight: 'bold',
    },
});

export default LearnView;

