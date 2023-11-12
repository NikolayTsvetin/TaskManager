import IExpense from "../interfaces/IExpense";
import IExpenseType from "../interfaces/IExpenseType";

export const getExpenses = async (): Promise<IExpense[]> => {
    try {
        const result: Response = await fetch('expenses/allExpenses');
        const expensesData: IExpense[] = await result.json();

        return expensesData;
    } catch (e) {
        return [];
    }
};

export const getExpenseTypes = async (): Promise<IExpenseType[]> => {
    try {
        const result: Response = await fetch('expenses/allExpenseTypes');
        const expenseTypesData: IExpenseType[] = await result.json();

        return expenseTypesData;
    } catch (e) {
        return [];
    }
};