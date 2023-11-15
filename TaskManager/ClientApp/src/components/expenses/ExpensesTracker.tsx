import { useEffect, useState } from 'react';
import styles from './ExpenseTracker.module.css';
import Expenses from './Expenses';
import IExpense from '../../interfaces/IExpense';
import IExpenseType from '../../interfaces/IExpenseType';
import { getExpenses, getExpenseTypes } from '../../api/Expenses.api';
import NewExpense from './NewExpense';

const ExpensesTracker: React.FC = () => {
    const [expenses, setExpenses] = useState<IExpense[]>([]);
    const [expenseTypes, setExpenseTypes] = useState<IExpenseType[]>([]);

    useEffect(() => {
        const getExpensesData = async () => setExpenses(await getExpenses());
        const getExpenseTypesData = async () => setExpenseTypes(await getExpenseTypes());

        getExpensesData();
        getExpenseTypesData();
    }, []);
    //const TEMP_EXPENSES = [
    //    { id: '1', typeId: '1', description: 'test', amount: 10 },
    //    { id: '2', typeId: '2', description: 'test2', amount: 20 },
    //    { id: '3', typeId: '3', description: 'test3', amount: 30 },
    //    { id: '4', typeId: '4', description: 'test4', amount: 40 },
    //    { id: '5', typeId: '5', description: 'test5', amount: 50 }
    //];

    if (expenseTypes === null || expenseTypes.length === 0) {
        return <p>Loading...</p>;
    }

    return (<>
        <div className={styles.expenseTracker}>
            <h2>Expense Tracker</h2>
            <NewExpense {...expenseTypes} />
            <Expenses expenses={expenses} expenseTypes={expenseTypes} />
        </div>
    </>);
};

export default ExpensesTracker;