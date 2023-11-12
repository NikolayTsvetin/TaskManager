import IExpensesInformation from "../../interfaces/IExpensesInformation";

const Expenses: React.FC<IExpensesInformation> = (expensesInformation: IExpensesInformation) => {
    const expenses = expensesInformation.expenses;
    const expenseTypes = expensesInformation.expenseTypes;

    return (<ul>
        {expenses.map((expense) => (
            <li key={expense.id}>
                {expense.description}: ${expense.amount} (Type: {expenseTypes.find((type) => type.id === expense.typeId)?.name})
            </li>
        ))}
    </ul>);
};

export default Expenses;