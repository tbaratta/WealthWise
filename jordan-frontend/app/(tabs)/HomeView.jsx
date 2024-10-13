import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const frontendIp = 'http://localhost:3000'; // Your backend IP

const HomePage = () => {
    const [messages, setMessages] = useState([]); // State for chat messages
    const [inputText, setInputText] = useState(""); // State for input text
    const [isChatExpanded, setIsChatExpanded] = useState(false); // State to control chat visibility

    const handleSendMessage = async () => {
        if (inputText.trim() === "") return; // Prevent sending empty messages

        // Add user message
        setMessages((prevMessages) => [...prevMessages, { user: "User", text: inputText }]);
        setInputText(""); // Clear input

        try {
            const response = await axios.post(`http://${frontendIp}/chatbot`, { // Adjust endpoint as necessary
                userMessage: inputText,
            });

            const botMessage = response.data.message || 'Sorry, I could not understand that.';
            setMessages((prevMessages) => [...prevMessages, { user: "Bot", text: botMessage }]);
        } catch (error) {
            console.error('Error sending message to chatbot:', error);
            setMessages((prevMessages) => [...prevMessages, { user: "Bot", text: "Sorry, I couldn't process that." }]);
        }
    };

    const chatbotInterface = () => (
        <View style={styles.chatContainer}>
            <TouchableOpacity style={styles.chatButton} onPress={() => setIsChatExpanded(!isChatExpanded)}>
                <Text style={styles.chatButtonText}>💬 Chat with me!</Text>
            </TouchableOpacity>
            {isChatExpanded && (
                <View style={styles.chatBox}>
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
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Welcome to WealthWise AI</Text>
            {chatbotInterface()}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    chatContainer: {
        marginTop: 16,
    },
    chatButton: {
        backgroundColor: '#ff4500',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    chatButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    chatBox: {
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        marginTop: 10,
        height: 400,
    },
    chatArea: {
        flex: 1,
        marginBottom: 10,
    },
    messageText: {
        fontSize: 16,
        marginVertical: 2,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputField: {
        flex: 1,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
    },
    sendButton: {
        marginLeft: 8,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        padding: 10,
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default HomePage;
