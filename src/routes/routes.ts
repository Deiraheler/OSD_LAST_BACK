import { Router } from 'express';
import {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
} from '../controllers/expense';

const router = Router();

router.post('/', createExpense); // Create a new expense
router.get('/', getAllExpenses); // Get all expenses
router.get('/:id', getExpenseById); // Get a specific expense by ID
router.put('/:id', updateExpense); // Update a specific expense
router.delete('/:id', deleteExpense); // Delete a specific expense

export default router;