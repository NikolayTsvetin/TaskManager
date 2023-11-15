import IExpense from "../interfaces/IExpense";
import IExpenseType from "../interfaces/IExpenseType";
import IHttpResponseObject from "../interfaces/IHttpResponseObject";
import INewExpense from "../interfaces/INewExpense";

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

export const createExpense = async (expense: INewExpense): Promise<IHttpResponseObject> => {
    const result: IHttpResponseObject = { success: false, errors: null };

    try {
        const response = await fetch('expenses/newExpense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expense)
        });

        const data = await response.json();

        if (data.success) {
            result.success = true;

            return result;
        } else {
            const errors = data.errors;
            result.errors = errors;

            return result;
        }
    } catch (e: unknown) {
        result.success = false;

        if (typeof e === 'string') {
            result.errors = e;
        } else if (e instanceof Error) {
            result.errors = e.message;
        }

        return result;
    }
};