import IExpenseType from "../../interfaces/IExpenseType";

const ExpenseTypes: React.FC<IExpenseType[]> = (expenseTypes: IExpenseType[]) => {
    return (<>
        <h3>Expense types:</h3>
        <button>Create new expense type</button>
        <ul>
            {expenseTypes.map((expenseType) => (
                <li key={expenseType.id}>{expenseType.name}</li>
            ))}
        </ul>
    </>);
};

export default ExpenseTypes;