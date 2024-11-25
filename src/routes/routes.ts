import { Router } from 'express';
import {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense, getAllCategories
} from '../controllers/expense';

const router = Router();

router.post('/', createExpense);
router.get('/', getAllExpenses);
router.get('/categories', getAllCategories);
router.get('/:id', getExpenseById);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;