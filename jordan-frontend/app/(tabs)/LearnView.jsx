import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import axios from 'axios';

const frontendIp = 'localhost:3000'; // Use the correct IP address for your backend
const stock = 'null';
const LearnView = () => {
    const [selectedModule, setSelectedModule] = useState(null);
    const [isChatExpanded, setIsChatExpanded] = useState(false);
    const [messages, setMessages] = useState([]); // State for chat messages
    const [inputText, setInputText] = useState(""); // State for input text
    const [learningTopics, setLearningTopics] = useState([]); // State for learning topics

    useEffect(() => {
        const fetchLearningTopics = async () => {
            try {
                const response = await axios.get(`http://${frontendIp}/learning`); // Fetch learning topics
                setLearningTopics(response.data);
            } catch (error) {
                console.error('Error fetching learning topics:', error);
            }
        };

        fetchLearningTopics();
    }, []);

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

    const handleSendMessage = async () => {
        if (inputText.trim() === "") return; // Prevent sending empty messages

        // Add user message
        setMessages((prevMessages) => [...prevMessages, { user: "User", text: inputText }]);
        setInputText(""); // Clear input

        try {
            const response = await axios.post(`http://${frontendIp}/learning/chatbot`, {
                userMessage: inputText, // Pass the user message
                stockSymbol: `${stock}` // Replace with dynamic stock symbol if needed
            });

            // Check if response data has the expected structure
            const botMessage = response.data.advice && response.data.advice.result
                ? response.data.advice.result // Adjust according to API response structure
                : 'Sorry, I could not understand that.';

            setMessages((prevMessages) => [...prevMessages, { user: "WealthWise AI", text: botMessage }]);
        } catch (error) {
            console.error('Error sending message to chatbot:', error);
            setMessages((prevMessages) => [...prevMessages, { user: "WealthWise AI", text: "Sorry, I couldn't process that." }]);
        }
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
                {learningTopics.map((topic) => (
                    <View key={topic.topic} style={styles.moduleContainer}>
                        <TouchableOpacity style={styles.moduleButton} onPress={() => {
                            setSelectedModule(selectedModule === topic.topic ? null : topic.topic);
                        }}>
                            <Text style={styles.moduleButtonText}>{topic.topic}</Text>
                        </TouchableOpacity>
                        {selectedModule === topic.topic && (
                            <View style={styles.linksContainer}>
                                <Text style={styles.linkText}>{topic.description}</Text>
                            </View>
                        )}
                    </View>
                ))}
                {chatbotModule()}
            </ScrollView>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        alignItems: 'center',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    moduleContainer: {
        marginBottom: 16,
    },
    moduleButton: {
        backgroundColor: 'green',
        padding: 16,
        borderRadius: 8,
    },
    moduleButtonText: {
        color: '#FFFFFF',
        alignSelf: 'center',
        fontSize: 18,
    },
    linksContainer: {
        marginTop: 8,
        paddingLeft: 16,
    },
    linkText: {
        fontSize: 16,
        color: '#555',
    },
    chatbotContainer: {
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
    fullChatContainer: {
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        marginTop: 10,
        height: 400,
    },
    chatHeader: {
        alignItems: 'center',
        marginBottom: 10,
    },
    chatHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
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

export default LearnView;