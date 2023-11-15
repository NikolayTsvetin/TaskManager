import IExpense from "../../interfaces/IExpense";
import IExpenseType from "../../interfaces/IExpenseType";
import IExpensesInformation from "../../interfaces/IExpensesInformation";

const Expenses: React.FC<IExpensesInformation> = (expensesInformation: IExpensesInformation) => {
    const expenses: IExpense[] = expensesInformation.expenses;
    const expenseTypes: IExpenseType[] = expensesInformation.expenseTypes;

    if (expenses === null || expenseTypes === null) {
        return <p>Loading...</p>;
    }

    if (expenses.length === 0) {
        return <p>No expenses yet. Start adding them!</p>;
    }

    return (<ul>
        {expenses.map((expense) => (
            <li key={expense.id}>
                {expense.description}: ${expense.amount} (Type: {expenseTypes.find((type) => type.id === expense.typeId)?.name})
            </li>
        ))}
    </ul>);
};

export default Expenses;