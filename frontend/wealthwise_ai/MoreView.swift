//
//  MoreView.swift
//  wealthwise_ai
//
//  Created by Allison Brown on 9/28/24.
//


import SwiftUI

struct MoreView: View {
    var body: some View {
        VStack(spacing: 0) { // Set spacing to 0 for seamless transition
            // Orange strip at the top
            Rectangle()
                .fill(Color.orange)
                .frame(height: 50)
                .overlay(
                    Text("More")
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding() // Optional padding for aesthetics
                )
            
            // Main content goes here
            Spacer() // Pushes content down

            Text("Hidden developer tools for project presentations")
                .font(.subheadline)
                .padding()
                .padding(.top, 20) // Adds some space above the text
            // You can add your pie chart and line graph here
            
            Spacer() // Pushes the content to the top
        }
        .background(Color.white) // Background color for the rest of the view
    }
}

struct MoreView_Previews: PreviewProvider {
    static var previews: some View {
        MoreView()
    }
}
