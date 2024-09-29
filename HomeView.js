// HomeView.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeView = () => {
    const [isChatExpanded, setIsChatExpanded] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async () => {
        // Add user's message to the conversation
        const newMessages = [...messages, { role: 'User', content: userMessage }];
        setMessages(newMessages);

        try {
            const response = await axios.post('http://your-backend-url.com/postChatbot', { // Link ChatBot here
                stockSymbol: '', // You can add logic to extract stock symbols if needed
                userMessage,
            });

            // Add bot's response to the conversation
            setMessages([...newMessages, { role: 'WealthWise AI', content: response.data.advice }]);
            setUserMessage(''); // Clear input field
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages([...newMessages, { role: 'WealthWise AI', content: 'Error getting response.' }]);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>WealthWise AI</Text>
            <Text style={styles.subtitle}>Your personal financial advisor</Text>
            
            {!isChatExpanded ? (
                <TouchableOpacity style={styles.chatBox} onPress={() => setIsChatExpanded(true)}>
                    <Text style={styles.chatIcon}>💬</Text>
                    <Text style={styles.chatText}>Ask me a question...</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.chatView}>
                    <ScrollView style={styles.scrollView}>
                        {messages.map((msg, index) => (
                            <Text key={index} style={msg.role === 'User' ? styles.userMessage : styles.botMessage}>
                                {msg.role}: {msg.content}
                            </Text>
                        ))}
                    </ScrollView>
                    <TextInput
                        style={styles.input}
                        placeholder="Ask me a question about finance..."
                        value={userMessage}
                        onChangeText={setUserMessage}
                    />
                    <Button title="Send" onPress={handleSendMessage} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 53,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        fontSize: 20,
        color: 'white',
    },
    chatBox: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    chatIcon: {
        fontSize: 50,
    },
    chatText: {
        fontSize: 12,
        color: 'black',
    },
    chatView: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    scrollView: {
        flex: 1,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#e1ffc7',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#d1d1d1',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        width: '100%',
    },
});

export default HomeView;