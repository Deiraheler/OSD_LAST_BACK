import { Schema, model, Document } from 'mongoose';

export interface IExpense extends Document {
    description: string;
    category: string;
    amount: number;
    status: string;
    date: Date;
}

const ExpenseSchema = new Schema<IExpense>({
    description: { type: String, required: true },
    category: { type: String, default: 'None', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    status: { type: String, default: 'pending' }
});

export default model<IExpense>('Expense', ExpenseSchema);