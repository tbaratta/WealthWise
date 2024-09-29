import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, ScrollView } from 'react-native';

const AnalyticsView = () => {
     const [showTransactions, setShowTransactions] = useState(false);
     const [newGoalName, setNewGoalName] = useState('');
     const [newGoalTargetAmount, setNewGoalTargetAmount] = useState('');

     const [spendingTransactions, setSpendingTransactions] = useState([
          { id: '1', name: 'Groceries', amount: 50 },
          { id: '2', name: 'Utilities', amount: 75 },
          { id: '3', name: 'Rent', amount: 1200 },
          { id: '4', name: 'Entertainment', amount: 100 },
     ]);

     const [savingsGoals, setSavingsGoals] = useState([
          { id: '1', name: 'Emergency Fund', targetAmount: 5000, currentAmount: 2000 },
          { id: '2', name: 'Vacation', targetAmount: 3000, currentAmount: 1500 },
     ]);

     const addGoal = () => {
          if (newGoalName && !isNaN(newGoalTargetAmount) && newGoalTargetAmount !== '') {
               const newGoal = {
                    id: Math.random().toString(),
                    name: newGoalName,
                    targetAmount: parseFloat(newGoalTargetAmount),
                    currentAmount: 0,
               };
               setSavingsGoals([...savingsGoals, newGoal]);
               setNewGoalName('');
               setNewGoalTargetAmount('');
          }
     };

     const removeGoal = (id) => {
          setSavingsGoals(savingsGoals.filter(goal => goal.id !== id));
     };

     const toggleTransactions = () => {
          setShowTransactions(prevState => !prevState);
     };

     return (
          <ScrollView style={styles.container}>
               <View style={styles.header}>
                    <Text style={styles.headerText}>Analytics</Text>
               </View>
               <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Spending</Text>
                    {/* Placeholder for Pie Chart */}
                    <View style={styles.chartPlaceholder}>
                         <Text style={styles.chartText}>📊 Pie Chart Placeholder</Text>
                    </View>
                    <Button title={showTransactions ? "Hide Transactions" : "Show Recent Transactions"} onPress={toggleTransactions} />
                    {showTransactions && (
                         <FlatList
                              data={spendingTransactions}
                              keyExtractor={item => item.id}
                              renderItem={({ item }) => (
                                   <View style={styles.transactionItem}>
                                        <Text>{item.name}</Text>
                                        <Text>${item.amount.toFixed(2)}</Text>
                                   </View>
                              )}
                         />
                    )}

                    <View style={styles.addGoalContainer}>
                         <TextInput
                              style={styles.input}
                              placeholder="Goal Name"
                              value={newGoalName}
                              onChangeText={setNewGoalName}
                         />
                         <TextInput
                              style={styles.input}
                              placeholder="Target Amount"
                              value={newGoalTargetAmount}
                              onChangeText={setNewGoalTargetAmount}
                              keyboardType="numeric"
                         />
                         <Button title="Add" onPress={addGoal} />
                    </View>

                    <FlatList
                         data={savingsGoals}
                         keyExtractor={item => item.id}
                         renderItem={({ item }) => (
                              <View style={styles.goalItem}>
                                   <Text>{item.name}</Text>
                                   <Text>Target: ${item.targetAmount}</Text>
                                   <Button title="Remove" onPress={() => removeGoal(item.id)} />
                              </View>
                         )}
                    />
               </View>
          </ScrollView>
     );
};

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#fff',
     },
     header: {
          backgroundColor: '#FFA500', // Orange color
          padding: 16,
     },
     headerText: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#fff',
     },
     section: {
          padding: 16,
          backgroundColor: '#f7f7f7',
          borderRadius: 10,
          marginBottom: 20,
     },
     sectionHeader: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 10,
     },
     chartPlaceholder: {
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#e0e0e0',
          borderRadius: 10,
          marginBottom: 10,
     },
     chartText: {
          fontSize: 24,
     },
     transactionItem: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
     },
     goalItem: {
          padding: 10,
          marginBottom: 10,
          backgroundColor: '#fff',
          borderRadius: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 1,
          elevation: 2,
     },
     addGoalContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
     },
     input: {
          flex: 1,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 8,
          marginRight: 8,
     },
});

export default AnalyticsView;
