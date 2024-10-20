import { Schema, model, Document } from 'mongoose';

export interface IExpense extends Document {
    description: string;
    category: string;
    amount: number;
    date: Date;
}

const ExpenseSchema = new Schema<IExpense>({
    description: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
});

export default model<IExpense>('Expense', ExpenseSchema);