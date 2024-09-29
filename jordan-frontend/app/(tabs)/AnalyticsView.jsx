import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { PieChart, LineChart } from 'react-native-chart-kit'; // Import chart components

// Replace with your backend URL
const backendUrl = 'http://10.0.2.2:3000'; // Replace with your actual local server IP
const userId = '1'; // Replace with the actual user ID

const AnalyticsView = () => {
     const [analyticsData, setAnalyticsData] = useState(null);
     const [loading, setLoading] = useState(true);

     // Predefined colors for pie chart segments
     const staticColors = [
          '#FF6384', // Red
          '#36A2EB', // Blue
          '#FFCE56', // Yellow
          '#4BC0C0', // Cyan
          '#9966FF', // Purple
          '#FF9F40', // Orange
          '#FF5733', // Dark Red
          '#C70039', // Crimson
          '#900C3F', // Maroon
          '#581845', // Dark Purple
     ];

     // Function to fetch analytics data from the backend
     const fetchData = async () => {
          try {
               const response = await fetch(`${backendUrl}/analytics/${userId}`);
               const data = await response.json();
               // console.log('Fetched Data:', data); // Debug: Check if backend data is correct
               setAnalyticsData(data);
               setLoading(false);
          } catch (error) {
               console.error('Error fetching analytics data:', error);
               setLoading(false);
          }
     };

     // UseEffect to set up polling to refresh data every 10 seconds
     useEffect(() => {
          fetchData(); // Initial fetch

          const intervalId = setInterval(() => {
               fetchData(); // Fetch updated data every 10 seconds
          }, 1000);

          // Cleanup the interval when the component unmounts
          return () => clearInterval(intervalId);
     }, []);

     if (loading) {
          return <Text>Loading data...</Text>;
     }

     if (!analyticsData) {
          return <Text>No data available</Text>;
     }

     // Debug: log the data to verify structure
     // console.log('Analytics Data:', analyticsData);

     // Prepare data for PieChart (Spending Categories) with static colors
     const spendingCategoriesData = analyticsData?.transactions_by_category?.map((item, index) => ({
          name: item.category,
          amount: item.total,
          color: staticColors[index % staticColors.length], // Use static colors in a loop
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
     }));

     // Prepare data for LineChart (Spending Over Time)
     const spendingOverTimeData = analyticsData?.spending_over_time; // Assume this is in the format [{ month: 'Jan', total: 100 }, ...]
     const lineData = {
          labels: spendingOverTimeData?.map(item => item.month) || [], // Extract months
          datasets: [
               {
                    data: spendingOverTimeData?.map(item => item.total) || [], // Extract total spending
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, // Line color
                    strokeWidth: 2, // Line thickness
               },
          ],
     };

     // Check for data validity before rendering
     const hasSpendingData = spendingCategoriesData && spendingCategoriesData.length > 0;
     const hasSpendingOverTimeData = spendingOverTimeData && spendingOverTimeData.length > 0;

     return (
          <ScrollView style={styles.container}>
               <View style={styles.section}>
                    <Text style={styles.header}>Spending by Category</Text>
                    {hasSpendingData ? (
                         <PieChart
                              data={spendingCategoriesData}
                              width={Dimensions.get('window').width - 30} // Adjust for screen size
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
                    <Text style={styles.header}>Spending Over Time</Text>
                    {hasSpendingOverTimeData ? (
                         <LineChart
                              data={lineData}
                              width={Dimensions.get('window').width - 30}
                              height={220}
                              chartConfig={chartConfig}
                              fromZero
                         />
                    ) : (
                         <Text>No spending over time data available</Text>
                    )}
               </View>
          </ScrollView>
     );
};

// Chart config for styling
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
});

export default AnalyticsView;
