import IExpense from "./IExpense";
import IExpenseType from "./IExpenseType";

interface IExpensesInformation {
    expenses: IExpense[],
    expenseTypes: IExpenseType[]
};

export default IExpensesInformation;