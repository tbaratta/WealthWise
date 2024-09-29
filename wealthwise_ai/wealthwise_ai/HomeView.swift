//
//  HomeView.swift
//  wealthwise_ai
//
//  Created by Allison Brown on 9/28/24.
//

import SwiftUI

struct HomeView: View {
    @State private var isChatExpanded = false // State to track chatbox expansion
    @State private var bounceAnimation = false // State for bouncing animation

    var body: some View {
        ZStack {
            // Set the background color to bright orange
            Color.orange
                .ignoresSafeArea() // Make the color extend to the edges of the screen
            
            // Main content
            VStack {
                Spacer(minLength: 50) // Adjusted spacer to push elements closer to center
                
                // WealthWise AI Title
                Text("WealthWise AI")
                    .font(.system(size: 53, weight: .bold))
                    .foregroundColor(.white) // Set text color to white
                
                // Subtitle
                Text("Your personal financial advisor")
                    .font(.system(size: 20))
                    .foregroundColor(.white) // Set text color to white
                
                // Chatbox
                if !isChatExpanded {
                    chatBox
                        .onTapGesture {
                            withAnimation {
                                isChatExpanded.toggle() // Expand the chatbox on tap
                            }
                        }
                        .offset(y: bounceAnimation ? -5 : 5) // Add bounce effect
                        .animation(Animation.linear(duration: 1.0).repeatForever(autoreverses: true), value: bounceAnimation) // Slower bouncing effect
                        .onAppear {
                            bounceAnimation.toggle() // Start the bouncing animation
                        }
                } else {
                    // Expanded chat view
                    fullScreenChatView
                        .onTapGesture {
                            withAnimation {
                                isChatExpanded.toggle() // Collapse the chatbox on tap
                            }
                        }
                }

                Spacer(minLength: 20) // Adjusted spacer to keep chatbox and text compact
                
                // Additional space below the chatbox
                Spacer()
            }
        }
    }
    
    // Chatbox view
    private var chatBox: some View {
        VStack {
            Text("💬") // Emoji for the chatbox
                .font(.system(size: 50)) // Adjust size for the emoji
                .padding()
                .background(Color.white) // Background for the chatbox
                .cornerRadius(15) // Rounded corners
                .shadow(radius: 10) // Add shadow for depth
                .frame(maxWidth: .infinity, alignment: .center) // Center the chatbox
            
            Text("Ask me a question...") // Tiny text under the chat icon
                .font(.footnote) // Small font size
                .foregroundColor(.white) // Text color for the tiny text
        }
        .padding(.top, 10) // Small padding to keep it neat
    }
    
    // Full screen chat view
    private var fullScreenChatView: some View {
        ZStack {
            Color.white // Background for the chat view
            
            VStack {
                Divider()
                Spacer()
                
                // Chat conversation area
                ScrollView {
                    VStack(alignment: .leading, spacing: 10) {
                        Text("User: How can I save more?")
                        Text("WealthWise AI: Here are some tips...")
                        // Add more chat messages here
                    }
                    .padding()
                }
                
                // Message input field
                HStack {
                    TextField("Ask me a question about finance...", text: .constant(""))
                        .padding(10)
                        .background(Color.gray.opacity(0.2))
                        .cornerRadius(10)
                    
                    Button(action: {
                        // Handle sending message
                    }) {
                        Text("Send")
                            .padding(.horizontal, 10)
                            .background(Color.orange)
                            .foregroundColor(.white)
                            .cornerRadius(10)
                    }
                }
                .padding()
            }
        }
        .ignoresSafeArea() // Make it cover the entire screen
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
    }
}
