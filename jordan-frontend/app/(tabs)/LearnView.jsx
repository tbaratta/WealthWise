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
                    <Text key={index} style={{ alignSelf: msg.user === "User" ? 'flex-end' : 'flex-start' }}>
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
                {moduleView("Savings")}
                {chatbotModule()}
            </ScrollView>
        </View>
    );
};

// Styles remain unchanged
const styles = StyleSheet.create({
    // ... (your existing styles)
});

export default LearnView;
