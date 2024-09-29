import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView, TextInput, Button } from 'react-native';

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

  const sendMessage = () => {
    if (inputValue.trim()) {
      // Add user message
      setMessages((prevMessages) => [...prevMessages, { text: inputValue, sender: 'User' }]);
      setInputValue(''); // Clear input
      // Mock response from AI
      setMessages((prevMessages) => [...prevMessages, { text: "Here's a tip on saving...", sender: 'WealthWise AI' }]);
    }
  };

  const ChatBox = () => (
    <TouchableOpacity style={styles.chatBox} onPress={() => setIsChatExpanded(true)}>
      <Animated.View style={{ transform: [{ translateY: bounceAnimation }] }}>
        <Text style={styles.chatEmoji}>💬</Text>
        <Text style={styles.chatText}>Ask me a question...</Text>
      </Animated.View>
    </TouchableOpacity>
  );

  const FullScreenChatView = () => (
    <View style={styles.fullScreenChatView}>
      <ScrollView style={styles.chatMessages}>
        {messages.map((msg, index) => (
          <Text key={index} style={msg.sender === 'User' ? styles.userMessage : styles.aiMessage}>
            {msg.sender}: {msg.text}
          </Text>
        ))}
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
      <View style={styles.header}>
        <Text style={styles.title}>WealthWise AI</Text>
        <Text style={styles.subtitle}>Your personal financial advisor</Text>
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
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
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
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  chatEmoji: {
    fontSize: 50,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  chatText: {
    fontSize: 12,
    color: 'white',
    marginTop: 10,
  },
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenChatView: {
    width: '90%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  chatMessages: {
    flex: 1,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
  },
  messageInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginRight: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1ffd1',
    padding: 10,
    borderRadius: 5,
    marginVertical: 2,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 2,
  },
});

export default HomeView;
