//
//  SettingsView.swift
//  wealthwise_ai
//
//  Created by Allison Brown on 9/28/24.
//


import SwiftUI

struct SettingsView: View {
    var body: some View {
        VStack(spacing: 0) { // No spacing to eliminate gaps
            // Orange strip at the top
            Rectangle()
                .fill(Color.orange)
                .frame(height: 50)
                .overlay(
                    Text("Settings")
                        .font(.headline)
                        .foregroundColor(.white)
                )

            // Main content
            ScrollView {
                VStack(spacing: 20) { // Vertical spacing between sections
                    Section(header: Text("Security")) {
                        // Placeholder for security-related settings
                        Text("Security settings will be added here in the future.")
                            .padding()
                            .background(Color.white)
                            .cornerRadius(15)
                            .shadow(radius: 5) // Add shadow for depth
                    }
                }
                .padding() // Padding around the entire view
            }
        }
        .background(Color.white) // Background color for the rest of the view
        .navigationTitle("") // Remove title from the navigation bar
    }
}

struct SettingsView_Previews: PreviewProvider {
    static var previews: some View {
        SettingsView()
    }
}
