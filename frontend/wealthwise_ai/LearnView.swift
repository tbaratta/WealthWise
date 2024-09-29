//
//  LearnView.swift
//  wealthwise_ai
//
//  Created by Allison Brown on 9/28/24.
//


import SwiftUI

struct LearnView: View {
    @State private var isChatExpanded = false
    @State private var selectedModule: String? // To track which module is expanded

    var body: some View {
        VStack {
            // Orange strip at the top
            Rectangle()
                .fill(Color.orange)
                .frame(height: 50)
                .overlay(
                    Text("Learn")
                        .font(.headline)
                        .foregroundColor(.white)
                )
            
            // List of modules, each in its own row
            VStack(spacing: 10) {
                moduleView(title: "Credit")
                moduleView(title: "Insurance")
                moduleView(title: "Loans")
                moduleView(title: "Savings")
            }
            .padding(.horizontal)
            
            // Chatbot Module
            chatbotModule
            
            Spacer()
        }
        .background(Color.white)
        .navigationTitle("") // Remove title from navigation bar
    }
    
    // Function to create a module view with dropdown
    private func moduleView(title: String) -> some View {
        VStack {
            Button(action: {
                withAnimation {
                    if selectedModule == title {
                        selectedModule = nil // Collapse if already open
                    } else {
                        selectedModule = title // Expand the selected module
                    }
                }
            }) {
                Text(title)
                    .font(.system(size: 24, weight: .bold)) // Larger font size
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color.orange)
                    .foregroundColor(.white)
                    .cornerRadius(8)
            }
            .padding(.vertical, 5)

            // Dropdown content
            if selectedModule == title {
                VStack(spacing: 5) {
                    ForEach(links(for: title), id: \.self) { link in
                        Text(link)
                            .padding()
                            .frame(maxWidth: .infinity)
                            .background(Color.gray.opacity(0.2))
                            .cornerRadius(8)
                    }
                }
                .padding(.horizontal)
                .transition(.slide) // Transition effect for dropdown
            }
        }
    }
    
    // Function to get links based on the module title
    private func links(for module: String) -> [String] {
        switch module {
        case "Credit":
            return ["Credit Basics Video", "Credit Management Test", "Credit Score Tips"]
        case "Insurance":
            return ["Insurance 101 Video", "Insurance Knowledge Test", "Types of Insurance"]
        case "Loans":
            return ["Understanding Loans Video", "Loan Application Test", "Loan Repayment Tips"]
        case "Savings":
            return ["Savings Strategies Video", "Savings Challenge Test", "How to Save Effectively"]
        default:
            return []
        }
    }
    
    // Chatbot Module
    private var chatbotModule: some View {
        VStack {
            if !isChatExpanded {
                Button(action: {
                    withAnimation {
                        isChatExpanded.toggle()
                    }
                }) {
                    Text("💬 Chat with me!")
                        .font(.title)
                        .padding()
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                }
            } else {
                fullScreenChatView
                    .onTapGesture {
                        withAnimation {
                            isChatExpanded.toggle()
                        }
                    }
            }
        }
        .padding()
    }
    
    // Full screen chat view for chatbot
    private var fullScreenChatView: some View {
        VStack {
            HStack {
                Text("WealthWise AI Chatbot")
                    .font(.title)
                    .foregroundColor(.black)
                Spacer()
            }
            .padding()
            
            Divider()
            
            Spacer()
            
            // Chat conversation area
            ScrollView {
                VStack(alignment: .leading, spacing: 10) {
                    Text("User: What can I learn about savings?")
                    Text("WealthWise AI: You can explore various tips and tricks to save effectively...")
                    // Add more chat messages here
                }
                .padding()
            }
            
            // Message input field
            HStack {
                TextField("Ask me a question...", text: .constant(""))
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
        .ignoresSafeArea() // Make it cover the entire screen
    }
}

struct LearnView_Previews: PreviewProvider {
    static var previews: some View {
        LearnView()
    }
}

