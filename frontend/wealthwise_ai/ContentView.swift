//
//  ContentView.swift
//  wealthwise_ai
//
//  Created by Allison Brown on 9/28/24.
//

import SwiftUI

struct ContentView: View {
    @State private var selectedTab = 2 // Default to Home

    var body: some View {
        VStack {
            Spacer()
            // Switch between views based on the selected tab
            switch selectedTab {
            case 0:
                SettingsView()
            case 1:
                AnalyticsView()
            case 2:
                HomeView()
            case 3:
                LearnView()
            case 4:
                MoreView()
            default:
                HomeView() // Fallback to Home
            }
            CustomTabBar(selectedTab: $selectedTab) // Bind the selected tab
        }
        .padding(.bottom, 20) // Add some padding to the bottom
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
