import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit'; // Import PieChart

const backendUrl = 'http://localhost:3000'; // Replace with you IP or localhost
const userId = '1'; // Replace with the actual user ID

const AnalyticsView = () => {
     const [analyticsData, setAnalyticsData] = useState(null);
     const [loading, setLoading] = useState(true);

     const staticColors = [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#FF5733', '#C70039', '#900C3F', '#581845'
     ];

     const fetchData = async () => {
          try {
               const response = await fetch(`${backendUrl}/analytics/${userId}`);
               const data = await response.json();
               setAnalyticsData(data);
               setLoading(false);
          } catch (error) {
               console.error('Error fetching analytics data:', error);
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchData(); // Initial fetch
          const intervalId = setInterval(fetchData, 1000); // Fetch updated data every 10 seconds
          return () => clearInterval(intervalId); // Cleanup the interval
     }, []);

     if (loading) {
          return <Text>Loading data...</Text>;
     }

     if (!analyticsData) {
          return <Text>No data available</Text>;
     }

     // Prepare data for PieChart (Spending by Category)
     const spendingCategoriesData = analyticsData?.transactions_by_category?.map((item, index) => ({
          name: item.category,
          amount: item.total,
          color: staticColors[index % staticColors.length],
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
     }));

     // Prepare data for Budget vs. Spent
     const budgetVsSpentData = analyticsData.budget_vs_spent[0];
     const budgetPercentage = ((budgetVsSpentData.total_spent / budgetVsSpentData.total_budget) * 100).toFixed(2);

     // Prepare data for Savings Goals
     const savingsGoals = analyticsData.savings_goals;

     const hasSpendingData = spendingCategoriesData && spendingCategoriesData.length > 0;

     return (
          <ScrollView style={styles.container}>
               <View style={styles.section}>
                    <Text style={styles.header}>Spending by Category</Text>
                    {hasSpendingData ? (
                         <PieChart
                              data={spendingCategoriesData}
                              width={Dimensions.get('window').width - 30}
                              height={220}
                              chartConfig={chartConfig}
                              accessor="amount"
                              backgroundColor="transparent"
                              paddingLeft="15"
                              absolute
                         />
                    ) : (
                         <Text>No spending data available</Text>
                    )}
               </View>

               <View style={styles.section}>
                    <Text style={styles.header}>Budget vs. Spent</Text>
                    <Text>{`Total Budget: $${budgetVsSpentData.total_budget}`}</Text>
                    <Text>{`Total Spent: $${budgetVsSpentData.total_spent}`}</Text>
                    <Text>{`Percentage of Budget Spent: ${budgetPercentage}%`}</Text>
               </View>

               <View style={styles.section}>
                    <Text style={styles.header}>Savings Goals</Text>
                    {savingsGoals.length > 0 ? (
                         savingsGoals.map((goal, index) => (
                              <View key={index} style={styles.goalContainer}>
                                   <Text style={styles.goalName}>{goal.goal_name}</Text>
                                   <Text>{`Target Amount: $${goal.target_amount}`}</Text>
                                   <Text>{`Current Savings: $${goal.current_savings}`}</Text>
                                   <Text>{`Days Until Deadline: ${goal.days_until_deadline}`}</Text>
                              </View>
                         ))
                    ) : (
                         <Text>No savings goals available</Text>
                    )}
               </View>
          </ScrollView>
     );
};

const chartConfig = {
     backgroundGradientFrom: '#1E2923',
     backgroundGradientTo: '#08130D',
     color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
     labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
     strokeWidth: 2,
     barPercentage: 0.5,
};

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#fff',
     },
     header: {
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 10,
     },
     section: {
          padding: 16,
          marginBottom: 20,
     },
     goalContainer: {
          marginBottom: 10,
          padding: 10,
          backgroundColor: '#f7f7f7',
          borderRadius: 5,
     },
     goalName: {
          fontSize: 18,
          fontWeight: 'bold',
     },
});

export default AnalyticsView;
