import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView, TextInput, Button } from 'react-native';
import axios from 'axios';

// Constants for API
const API_URL = 'http://10.0.2.2:3000/home/chatbot'; // Replace with your backend IP

const HomeView = () => {
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [messages, setMessages] = useState([]); // State to hold chat messages
  const [inputValue, setInputValue] = useState(''); // State to hold user input
  const bounceAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnimation, {
          toValue: -5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnimation, {
          toValue: 5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    // Start bouncing animation
    bounce.start();

    // Stop animation when chat is expanded
    return () => bounce.stop();
  }, [bounceAnimation]);

  const sendMessage = async () => {
    if (inputValue.trim()) {
      // Add user message
      const userMessage = inputValue;
      setMessages((prevMessages) => [...prevMessages, { text: userMessage, sender: 'User' }]);
      setInputValue(''); // Clear input

      try {
        // Make API call to the backend
        const response = await axios.post(API_URL, {
          stockSymbol: 'null', // Example stock symbol, replace as needed
          userMessage: userMessage,
        });

        console.log("Response from server:", response.data); // Log the full response

        // Check if advice is an object and extract the relevant text
        const advice = response.data.advice.result; // Assuming 'result' is the key you want to display
        if (advice) {
          // Add AI response to the chat
          setMessages((prevMessages) => [...prevMessages, { text: advice, sender: 'WealthWise AI' }]);
        } else {
          setMessages((prevMessages) => [...prevMessages, { text: 'No advice received from server.', sender: 'WealthWise AI' }]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages((prevMessages) => [...prevMessages, { text: 'Error getting advice. Please try again.', sender: 'WealthWise AI' }]);
      }
    }
  };


  const ChatBox = () => (
    <TouchableOpacity style={styles.chatBox} onPress={() => setIsChatExpanded(true)}>
      <Animated.View style={{ transform: [{ translateY: bounceAnimation }] }}>
        <View style={styles.chatBubble}>
          <Text style={styles.chatEmoji}>💬</Text>
        </View>
        <Text style={styles.chatText}>Ask me a question...</Text>
      </Animated.View>
    </TouchableOpacity>
  );

  const FullScreenChatView = () => (
    <View style={styles.fullScreenChatView}>
      <ScrollView style={styles.chatMessages}>
        {messages.length === 0 ? (
          <Text style={styles.noMessagesText}>No messages yet. Start chatting!</Text>
        ) : (
          messages.map((msg, index) => (
            <Text key={index} style={msg.sender === 'User' ? styles.userMessage : styles.aiMessage}>
              {msg.sender}: {msg.text}
            </Text>
          ))
        )}
      </ScrollView>

      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder="Ask me a question about finance..."
          placeholderTextColor="#666"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Button title="Send" color="orange" onPress={sendMessage} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.aiHeader}>WealthWise AI</Text>
        <Text style={styles.aiSubHeader}>Your Personal Financial Advisor</Text>
      </View>
      {!isChatExpanded ? (
        <ChatBox />
      ) : (
        <TouchableOpacity style={styles.fullScreenOverlay} onPress={() => setIsChatExpanded(false)}>
          <FullScreenChatView />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  hero: {
    marginBottom: 20,
    alignItems: 'center',
  },
  aiHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  aiSubHeader: {
    fontSize: 16,
    color: '#666',
  },
  chatBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  chatBubble: {
    backgroundColor: '#e1e1e1',
    borderRadius: 15,
    padding: 10,
  },
  chatEmoji: {
    fontSize: 30,
  },
  chatText: {
    marginTop: 5,
    fontSize: 14,
  },
  fullScreenChatView: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  chatMessages: {
    flex: 1,
    marginBottom: 10,
  },
  noMessagesText: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#a0e1a0',
    borderRadius: 5,
    padding: 5,
    marginVertical: 2,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1e1e1',
    borderRadius: 5,
    padding: 5,
    marginVertical: 2,
  },
  fullScreenOverlay: {
    flex: 1,
  },
});

export default HomeView;
