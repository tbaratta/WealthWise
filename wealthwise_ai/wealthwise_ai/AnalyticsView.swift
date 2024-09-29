import SwiftUI

struct AnalyticsView: View {
    @State private var spendingTransactions: [Transaction] = [
        Transaction(name: "Groceries", amount: 50),
        Transaction(name: "Utilities", amount: 75),
        Transaction(name: "Rent", amount: 1200),
        Transaction(name: "Entertainment", amount: 100)
    ]
    
    @State private var savingsGoals: [SavingsGoal] = [
        SavingsGoal(name: "Emergency Fund", targetAmount: 5000, currentAmount: 2000),
        SavingsGoal(name: "Vacation", targetAmount: 3000, currentAmount: 1500)
    ]
    
    @State private var showTransactions = false
    
    // New State Variables for Adding Goals
    @State private var newGoalName: String = ""
    @State private var newGoalTargetAmount: String = ""
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Orange strip at the top
                Rectangle()
                    .fill(Color.orange)
                    .frame(height: 50)
                    .overlay(
                        Text("Analytics")
                            .font(.headline)
                            .foregroundColor(.white)
                    )
                
                // Spending Section
                VStack(alignment: .leading, spacing: 16) {
                    headerView(title: "Spending")
                    
                    // Placeholder for pie chart
                    chartPlaceholderView(text: "📊 Pie Chart Placeholder")

                    // Toggle for showing/hiding transactions
                    Button(action: {
                        withAnimation {
                            showTransactions.toggle()
                        }
                    }) {
                        Text(showTransactions ? "Hide Transactions" : "Show Recent Transactions")
                            .foregroundColor(.white)
                            .padding()
                            .background(Color.blue)
                            .cornerRadius(8)
                            .frame(maxWidth: .infinity) // Center the button
                    }

                    // Recent Transactions List
                    if showTransactions {
                        transactionListView()
                    }
                }
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(10)

                // Savings Section
                VStack(alignment: .leading, spacing: 16) {
                    headerView(title: "Savings")
                    
                    // Placeholder for line graph
                    chartPlaceholderView(text: "📈 Line Graph Placeholder")

                    // Savings Goals List
                    savingsGoalsListView()

                    // Add New Savings Goal
                    addSavingsGoalView()
                }
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(10)
            }
            .padding()
        }
        .background(Color.white)
        .navigationTitle("")
    }
    
    // MARK: - Custom Views
    
    // Custom Header View
    private func headerView(title: String) -> some View {
        HStack {
            Text(title)
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.white)
                .padding()
            Spacer()
        }
        .background(Color.orange)
    }
    
    // Custom Chart Placeholder View
    private func chartPlaceholderView(text: String) -> some View {
        Text(text)
            .font(.largeTitle)
            .padding()
            .frame(maxWidth: .infinity)
            .background(Color.gray.opacity(0.2))
            .cornerRadius(10)
    }
    
    // Recent Transactions List View
    private func transactionListView() -> some View {
        VStack {
            // Centering the transaction list with alignment and padding
            VStack(alignment: .center) {
                List(spendingTransactions) { transaction in
                    HStack {
                        Text(transaction.name)
                        Spacer()
                        Text("$\(transaction.amount, specifier: "%.2f")")
                    }
                    .padding()
                    .background(Color.white)
                    .cornerRadius(8)
                    .shadow(radius: 1)
                }
                .frame(height: 200)
                .listStyle(PlainListStyle()) // Simplify the list style for better appearance
                .padding(.horizontal)
            }
        }
        .frame(maxHeight: 300)
        .frame(maxWidth: .infinity) // Centering the whole transaction list
    }

    // Savings Goals List View
    private func savingsGoalsListView() -> some View {
        VStack {
            ForEach(savingsGoals) { goal in
                HStack {
                    VStack(alignment: .leading) {
                        Text(goal.name)
                            .font(.headline)
                        Text("Target: $\(goal.targetAmount, specifier: "%.2f") | Current: $\(goal.currentAmount, specifier: "%.2f")")
                            .font(.subheadline)
                            .foregroundColor(.gray)
                    }
                    Spacer()
                    // Remove button
                    Button(action: {
                        removeGoal(goal)
                    }) {
                        Image(systemName: "trash")
                            .foregroundColor(.white)
                            .padding(10)
                            .background(Color.red)
                            .cornerRadius(8)
                    }
                }
                .padding()
                .background(Color.white)
                .cornerRadius(10)
                .shadow(radius: 1)
            }
            .onDelete(perform: delete)
        }
        .padding(.top, 10)
        .frame(maxWidth: .infinity)
    }

    // Add New Savings Goal View
    private func addSavingsGoalView() -> some View {
        HStack {
            TextField("Goal Name", text: $newGoalName)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
            
            TextField("Target Amount", text: $newGoalTargetAmount)
                .keyboardType(.decimalPad) // Allow decimal input
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
            
            Button(action: {
                addGoal()
            }) {
                Text("Add")
                    .foregroundColor(.white)
                    .padding()
                    .background(Color.green)
                    .cornerRadius(8)
            }
        }
        .padding(.top, 20) // Space above the add goal area
    }
    
    // MARK: - Functions
    
    // Function to remove a savings goal
    private func removeGoal(_ goal: SavingsGoal) {
        if let index = savingsGoals.firstIndex(where: { $0.id == goal.id }) {
            savingsGoals.remove(at: index)
        }
    }
    
    // Function to handle delete action
    private func delete(at offsets: IndexSet) {
        savingsGoals.remove(atOffsets: offsets)
    }

    // Function to add a new savings goal
    private func addGoal() {
        guard let targetAmount = Double(newGoalTargetAmount), !newGoalName.isEmpty else {
            // Optionally handle invalid input
            return
        }
        let newGoal = SavingsGoal(name: newGoalName, targetAmount: targetAmount, currentAmount: 0)
        savingsGoals.append(newGoal)
        newGoalName = ""
        newGoalTargetAmount = ""
    }
}

// Transaction Model
struct Transaction: Identifiable {
    let id = UUID()
    let name: String
    let amount: Double
}

// SavingsGoal Model
struct SavingsGoal: Identifiable {
    let id = UUID()
    let name: String
    let targetAmount: Double
    let currentAmount: Double
}

struct AnalyticsView_Previews: PreviewProvider {
    static var previews: some View {
        AnalyticsView()
    }
}
