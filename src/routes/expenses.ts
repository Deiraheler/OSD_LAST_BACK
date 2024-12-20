import { Router } from 'express';

import {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense, getAllCategories
} from '../controllers/expense';
import {authenticate} from "../middleware/auth";

const router = Router();

router.post('/', authenticate, createExpense);
router.get('/', authenticate, getAllExpenses);
router.get('/categories', authenticate, getAllCategories);
router.get('/:id', authenticate, getExpenseById);
router.put('/:id', authenticate, updateExpense);
router.delete('/:id', authenticate, deleteExpense);

export default router;