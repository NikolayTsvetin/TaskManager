import styles from './ExpenseTracker.module.css';
import Expenses from './Expenses';

const ExpensesTracker: React.FC = () => {
    const TEMP_EXPENSES = [
        { id: '1', typeId: '1', description: 'test', amount: 10 },
        { id: '2', typeId: '2', description: 'test2', amount: 20 },
        { id: '3', typeId: '3', description: 'test3', amount: 30 },
        { id: '4', typeId: '4', description: 'test4', amount: 40 },
        { id: '5', typeId: '5', description: 'test5', amount: 50 }
    ];

    const TEMP_EXPENSE_TYPES = [
        { id: '1', name: 'Credit' },
        { id: '2', name: 'Food' },
        { id: '3', name: 'Going out' },
        { id: '4', name: 'Home stuff' },
        { id: '5', name: 'Clothes' },
    ];

    return (<>
        <div className={styles.expenseTracker}>
            <h2>Expense Tracker</h2>

            <form>
                <div>
                    <label>Description:</label>
                    <input />
                </div>
                <div>
                    <label>Amount:</label>
                    <input type="number" />
                </div>
                <div>
                    <label>Type:</label>
                    <select>
                        {TEMP_EXPENSE_TYPES.map((type) => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                </div>
                <button type="button">Add Expense</button>
            </form>
            <Expenses expenses={TEMP_EXPENSES} expenseTypes={TEMP_EXPENSE_TYPES} />
        </div>
    </>);
};

export default ExpensesTracker;