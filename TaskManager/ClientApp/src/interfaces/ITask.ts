interface ITask {
    id: string,
    title: string,
    description: string,
    dateCreated: Date,
    dueDate: Date | null
}

export default ITask;