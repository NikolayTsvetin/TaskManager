import IExpenseType from "./IExpenseType";

interface INewExpense {
    description: string,
    amount: number,
    type: IExpenseType
};

export default INewExpense;