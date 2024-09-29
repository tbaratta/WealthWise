import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import axios from 'axios';
const frontendIp = '10.0.2.2:3000';

const LearnView = () => {
    const [selectedModule, setSelectedModule] = useState(null);
    const [isChatExpanded, setIsChatExpanded] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");

    const modules = [
        { title: "Credit", description: "Learn about credit scores and management." },
        { title: "Insurance", description: "Understand the different types of insurance." },
        { title: "Investing", description: "Basics of investing and wealth building." },
        { title: "Loans", description: "Learn about loan types and repayments." },
        { title: "Savings", description: "Tips on effective saving strategies." },
        { title: "Budgeting", description: "How to create and maintain a budget." }
    ];

    const links = (module) => {
        switch (module) {
            case "Credit":
                return ["Credit Basics Video", "Credit Management Test", "Credit Score Tips"];
            case "Insurance":
                return ["Insurance 101 Video", "Insurance Knowledge Test", "Types of Insurance"];
            case "Investing":
                return ["Investment Strategies", "Stock Market Basics", "Retirement Planning"];
            case "Loans":
                return ["Understanding Loans Video", "Loan Application Test", "Loan Repayment Tips"];
            case "Savings":
                return ["Saving Strategies", "Emergency Funds", "High-Interest Accounts"];
            case "Budgeting":
                return ["Budgeting Techniques", "Expense Tracking", "Monthly Budget Templates"];
            default:
                return [];
        }
    };

    const moduleView = (module) => (
        <View style={styles.moduleContainer}>
            <TouchableOpacity style={styles.moduleButton} onPress={() => {
                setSelectedModule(selectedModule === module.title ? null : module.title);
            }}>
                <Text style={styles.moduleButtonText}>{module.title}</Text>
                <Text style={styles.moduleDescription}>{module.description}</Text>
            </TouchableOpacity>
            {selectedModule === module.title && (
                <View style={styles.linksContainer}>
                    {links(module.title).map((link, index) => (
                        <Text key={index} style={styles.linkText}>{link}</Text>
                    ))}
                </View>
            )}
        </View>
    );

    const handleSendMessage = async () => {
        if (inputText.trim() === "") return;

        // Add user message
        setMessages((prevMessages) => [...prevMessages, { user: "User", text: inputText }]);
        setInputText("");

        try {
            // Send message to backend and await response
            const response = await axios.post(`http://${frontendIp}/api/chat`, {
                message: inputText
            });
            // Add bot response
            setMessages((prevMessages) => [
                ...prevMessages,
                { user: "WealthWise AI", text: response.data.response }
            ]);
        } catch (error) {
            console.error("Error sending message to the backend:", error);
        }
    };

    const chatbotView = () => (
        <View style={styles.chatbotContainer}>
            <TouchableOpacity style={styles.chatButton} onPress={() => setIsChatExpanded(!isChatExpanded)}>
                <Text style={styles.chatButtonText}>{isChatExpanded ? 'Hide Chat' : '💬 Chat with me!'}</Text>
            </TouchableOpacity>
            {isChatExpanded && fullScreenChatView()}
        </View>
    );

    const fullScreenChatView = () => (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.fullChatContainer}>
            <View style={styles.chatHeader}>
                <Text style={styles.chatHeaderText}>WealthWise AI Chatbot</Text>
            </View>
            <ScrollView style={styles.chatArea} contentContainerStyle={styles.chatContent}>
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
                    onSubmitEditing={handleSendMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Learn</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.modulesGrid}>
                    {modules.map((module, index) => (
                        <View key={index} style={styles.moduleItem}>
                            {moduleView(module)}
                        </View>
                    ))}
                </View>
                {chatbotView()}
            </ScrollView>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    header: {
        backgroundColor: 'orange',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    headerText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    modulesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    moduleItem: {
        width: '48%', // Adjust the width for two columns
        marginBottom: 10,
    },
    moduleContainer: {
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
        backgroundColor: 'orange',
    },
    moduleButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    moduleDescription: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
    },
    linksContainer: {
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    linkText: {
        color: 'orange',
        fontSize: 16,
        marginVertical: 5,
    },
    chatbotContainer: {
        marginTop: 20,
    },
    chatButton: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    chatButtonText: {
        color: 'white',
        fontSize: 18,
    },
    fullChatContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginTop: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    chatHeader: {
        backgroundColor: 'orange',
        padding: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    chatHeaderText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    chatArea: {
        maxHeight: 300, // Limit height for scrolling
    },
    chatContent: {
        padding: 10,
        justifyContent: 'flex-end',
    },
    messageText: {
        fontSize: 16,
        marginVertical: 5,
        maxWidth: '80%',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    inputField: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: 'orange',
        borderRadius: 8,
        padding: 10,
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default LearnView;
