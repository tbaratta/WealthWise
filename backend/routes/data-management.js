// analytics.js (in the routes directory)
const express = require('express');
const router = express.Router();
const userController = require('../controllers/data-management/userController');
const transactionController = require('../controllers/data-management/transactionController');
const incomeController = require('../controllers/data-management/incomeController');
const budgetController = require('../controllers/data-management/budgetController');
const savingsGoalController = require('../controllers/data-management/savingsGoalsController');


// Routes for data management
// User
router.post('/users', userController.postUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.putUserById);
router.delete('/users/:id', userController.deleteUserById);

// Transactions
router.post('/transactions', transactionController.postTransactions);
router.get('/transactions/:user_id', transactionController.getTransactionsByUserId);
router.put('/transactions/:id', transactionController.putTransactionsById);
router.delete('/transactions/:id', transactionController.deleteTransactionsById);

// Income
router.post('/income', incomeController.postIncome);
router.get('/income/:userId', incomeController.getIncomeByUserId);
router.put('/income/:id', incomeController.putIncomeById);
router.delete('/income/:id', incomeController.deleteIncomeById);

// Budgets
router.post('/budgets', budgetController.postBudgets);
router.get('/budgets/:userId', budgetController.getBudgetsByUserId);
router.put('/budgets/:id', budgetController.putBudgetsById);
router.delete('/budgets/:id', budgetController.deleteBudgetsById);

// Savings Goals
router.post('/savings-goals', savingsGoalController.postSavingsGoals);
router.get('/savings-goals/:userId', savingsGoalController.getSavingsGoalsByUserId);
router.put('/savings-goals/:id', savingsGoalController.putSavingsGoalsById);
router.delete('/savings-goals/:id', savingsGoalController.deleteSavingsGoalsById);

module.exports = router;
