//
//  CustomTabBar.swift
//  wealthwise_ai
//
//  Created by Allison Brown on 9/28/24.
//


import SwiftUI

struct CustomTabBar: View {
    @Binding var selectedTab: Int // This binds to the selected tab index

    var body: some View {
        HStack {
            ForEach(0..<5) { index in
                Button(action: {
                    selectedTab = index // Update the selected tab
                }) {
                    VStack {
                        Image(systemName: tabIcon(for: index)) // Use system icons
                            .font(.system(size: 20))
                            .foregroundColor(selectedTab == index ? .orange : .gray) // Highlight selected tab
                        Text(tabTitle(for: index))
                            .font(.footnote)
                            .foregroundColor(selectedTab == index ? .orange : .gray)
                    }
                }
                .frame(maxWidth: .infinity) // Distribute buttons evenly
            }
        }
        .background(Color.white) // Background color for the tab bar
        .cornerRadius(10)
        .padding()
    }

    private func tabTitle(for index: Int) -> String {
        switch index {
        case 0: return "Settings"
        case 1: return "Analytics"
        case 2: return "Home"
        case 3: return "Learn"
        case 4: return "More"
        default: return ""
        }
    }
    
    private func tabIcon(for index: Int) -> String {
        switch index {
        case 0: return "gear" // Settings icon
        case 1: return "chart.pie" // Analytics icon
        case 2: return "house" // Home icon
        case 3: return "book" // Learn icon
        case 4: return "ellipsis.circle" // More icon
        default: return ""
        }
    }
}
