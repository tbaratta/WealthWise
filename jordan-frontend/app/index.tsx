import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView, TextInput, Button } from 'react-native';

const HomeView = () => {
  const [isChatExpanded, setIsChatExpanded] = useState(false); // State to track chatbox expansion
  const bounceAnimation = useRef(new Animated.Value(0)).current; // State for bounce animation

  useEffect(() => {
    // Bounce animation logic
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnimation, {
          toValue: -5, // Move up by 5 units
          duration: 1000, // 1 second
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnimation, {
          toValue: 5, // Move down by 5 units
          duration: 1000, // 1 second
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnimation]);

  // Chatbox component
  const ChatBox = () => (
    <TouchableOpacity style={styles.chatBox} onPress={() => setIsChatExpanded(true)}>
      <Animated.View style={{ transform: [{ translateY: bounceAnimation }] }}>
        <Text style={styles.chatEmoji}>💬</Text>
        <Text style={styles.chatText}>Ask me a question...</Text>
      </Animated.View>
    </TouchableOpacity>
  );

  // Full screen chat view component
  const FullScreenChatView = () => (
    <View style={styles.fullScreenChatView}>
      <ScrollView style={styles.chatMessages}>
        {/* Example chat messages */}
        <Text>User: How can I save more?</Text>
        <Text>WealthWise AI: Here are some tips...</Text>
        {/* Add more chat messages here */}
      </ScrollView>

      {/* Input field for new messages */}
      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder="Ask me a question about finance..."
          placeholderTextColor="#666"
        />
        <Button title="Send" color="orange" onPress={() => { /* Handle sending message */ }} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WealthWise AI</Text>
        <Text style={styles.subtitle}>Your personal financial advisor</Text>
      </View>

      {/* Conditionally render the chat box or the full screen chat view */}
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

// Styles for the HomeView component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange', // Set the background color to bright orange
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20, // Adjust this value for spacing
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
    elevation: 5, // Add shadow for Android
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
});

export default HomeView;