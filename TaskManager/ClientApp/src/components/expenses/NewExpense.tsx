import { useRef } from "react";
import IExpenseType from "../../interfaces/IExpenseType";
import INewExpense from "../../interfaces/INewExpense";
import { createExpense } from "../../api/Expenses.api";
import IHttpResponseObject from "../../interfaces/IHttpResponseObject";

const NewExpense: React.FC<IExpenseType[]> = (expenseTypes: IExpenseType[]) => {
    const descriptionRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);
    const expenseTypeRef = useRef<HTMLSelectElement>(null);

    const submitHandler = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        const descriptionValue: string = descriptionRef && descriptionRef.current ? descriptionRef.current.value : '';
        const amountValue: number | null = amountRef && amountRef.current ? parseFloat(amountRef.current.value) : null;
        const expenseTypeValue: string = expenseTypeRef && expenseTypeRef.current ? expenseTypeRef.current.value : '';

        if (descriptionValue === '' || amountValue == null || expenseTypeValue === '') {
            // show error
            return;
        }

        const expenseType: IExpenseType | undefined = expenseTypes.find(x => x.id.toLowerCase() === expenseTypeValue.toLowerCase());

        if (!expenseType) {
            // show error
            return;
        }

        const newExpense: INewExpense = {
            description: descriptionValue,
            amount: amountValue,
            type: expenseType
        };

        const response: IHttpResponseObject = await createExpense(newExpense);

        if (response.errors) {
            throw response.errors;
        }
    };

    // todo extract css in one generic file for all new forms
    if (!expenseTypes) {
        return <p>Loading...</p>;
    }

    expenseTypes = Object.values(expenseTypes);

    return (<form onSubmit={submitHandler}>
        <div>
            <label htmlFor="description">Description:</label>
            <input id="description" type="text" ref={descriptionRef} />
        </div>
        <div>
            <label htmlFor="amount">Amount:</label>
            <input id="amount" type="number" ref={amountRef} />
        </div>
        <div>
            <label htmlFor="type">Type:</label>
            <select id="type" ref={expenseTypeRef}>
                {expenseTypes.map((type) => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                ))}
            </select>
        </div>
        <button type="submit">Add Expense</button>
    </form>);
};

export default NewExpense;