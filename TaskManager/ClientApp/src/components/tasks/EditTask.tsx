import { useRef } from "react";
import ITask from "../../interfaces/ITask";
import styles from './NewTask.module.css';
import { editTask } from "../../api/Tasks.api";
import IHttpResponseObject from "../../interfaces/IHttpResponseObject";

const EditTask: React.FC<ITask> = (task: ITask) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const dueDateRef = useRef<HTMLInputElement>(null);

    const submitHandler = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        const titleValue = titleRef && titleRef.current ? titleRef.current.value : '';
        const descriptionValue = descriptionRef && descriptionRef.current ? descriptionRef.current.value : '';
        const dueDateValue = dueDateRef && dueDateRef.current ? new Date(dueDateRef.current.value) : null;

        if (titleValue === '') {
            // show error
            return;
        }

        const updatedTask: ITask = {
            id: task.id,
            dateCreated: task.dateCreated,
            title: titleValue,
            description: descriptionValue,
            dueDate: dueDateValue
        };

        const response: IHttpResponseObject = await editTask(updatedTask);

        if (response.errors) {
            throw response.errors;
        }

        //clearInputValues();
    };

    const dateCreatedParsed: Date = new Date(task.dateCreated.toString());
    let dueDateDisplay: string = 'No due date set';

    if (task.dueDate) {
        const dueDateParsed: Date = new Date(task.dueDate.toString());
        dueDateDisplay = dueDateParsed.toISOString().substr(0, 10);
    }

    return (<form className={styles.form} onSubmit={submitHandler}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" ref={titleRef} defaultValue={task.title} />
        <label htmlFor="description">Description</label>
        <textarea id="description" ref={descriptionRef} defaultValue={task.description} />
        <label htmlFor="dueDate">Due date</label>
        <input id="dueDate" type="date" ref={dueDateRef} defaultValue={dueDateDisplay} />
        <label htmlFor="dueDate">Date created</label>
        <input id="dueDate" type="date" defaultValue={dateCreatedParsed.toISOString().substr(0, 10)} disabled={true} />
        <button type="submit">Edit</button>
    </form>);
};

export default EditTask;