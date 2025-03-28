import { Router } from 'express';

import {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense, getAllCategories, updateExpenseStatus
} from '../controllers/expense';
import {authenticate} from "../middleware/auth";
import {isAdmin} from "../middleware/isAdmin";

const router = Router();

router.post('/', authenticate, createExpense);
router.patch('/:id/status', authenticate, isAdmin, updateExpenseStatus);
router.get('/', authenticate, getAllExpenses);
router.get('/categories', authenticate, getAllCategories);
router.get('/:id', authenticate, getExpenseById);
router.put('/:id', authenticate, updateExpense);
router.delete('/:id', authenticate, deleteExpense);

export default router;