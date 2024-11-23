import { Request, Response } from 'express';
import Expense from '../models/expense';

const handleError = (error: unknown, res: Response, statusCode: number = 500) => {
    if (error instanceof Error) {
        res.status(statusCode).json({ message: error.message });
    } else {
        res.status(statusCode).json({ message: 'An unknown error occurred' });
    }
};

// Create a new expense
export const createExpense = async (req: Request, res: Response): Promise<void> => {
    try {
        const expense = new Expense(req.body);
        const savedExpense = await expense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        handleError(error, res, 400);
    }
};

// Get all expenses
export const getAllExpenses = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = 1, limit = 9, sortBy = 'date', sortOrder = 'asc' } = req.query;

        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);
        const skip = (pageNumber - 1) * limitNumber;

        const sortOptions = { [sortBy as string]: sortOrder === 'asc' ? 1 : -1 } as Record<string, 1 | -1>;

        const expenses = await Expense.find()
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNumber);

        const totalItems = await Expense.countDocuments();

        res.status(200).json({
            totalItems,
            totalPages: Math.ceil(totalItems / limitNumber),
            currentPage: pageNumber,
            expenses,
        });
    } catch (error) {
        handleError(error, res);
    }
};

//Get all categories
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await Expense.distinct('category');
        res.status(200).json(categories);
    } catch (error) {
        handleError(error, res);
    }
};

// Get a single expense by ID
export const getExpenseById = async (req: Request, res: Response): Promise<void> => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (expense) {
            res.status(200).json(expense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        handleError(error, res);
    }
};

// Update an expense
export const updateExpense = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedExpense) {
            res.status(200).json(updatedExpense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        handleError(error, res, 400);
    }
};

// Delete an expense
export const deleteExpense = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        if (deletedExpense) {
            res.status(200).json({ message: 'Expense deleted successfully' });
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        handleError(error, res);
    }
};