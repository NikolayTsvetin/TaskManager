import ITask from '../../interfaces/ITask';
import styles from './Task.module.css';
import { deleteTask } from '../../api/Tasks.api';
import IHttpResponseObject from '../../interfaces/IHttpResponseObject';

const Task: React.FC<ITask> = (model: ITask) => {
    const dateCreatedParsed: Date = new Date(model.dateCreated.toString());
    let dueDateDisplay: string = 'No due date set';

    if (model.dueDate) {
        const dueDateParsed: Date = new Date(model.dueDate.toString());
        dueDateDisplay = dueDateParsed.toDateString();
    }

    const onDelete = async (id: string): Promise<void> => {
        debugger;
        // todo: add confirmation

        const result: IHttpResponseObject = await deleteTask(id);
        console.log(result);
    };

    return (<div className={`${styles.taskContainer} ${styles.taskSeparator}`} key={model.id}>
        <div className={styles.taskContent}>
            <div className={styles.taskInfo}>
                <h1 className={styles.taskHeader}>{model.title}</h1>
                <p className={styles.taskDescription}>{model.description}</p>
                <p className={styles.taskDescription}>Created: {dateCreatedParsed.toDateString()}</p>
                <p className={styles.taskDescription}>Due date: {dueDateDisplay}</p>
            </div>
            <div className={styles.taskButtons}>
                <button className={styles.button}>Edit</button>
                <button className={styles.button}>Mark as completed</button>
                <button className={`${styles.button} ${styles.deleteButton}`} onClick={() => onDelete(model.id)}>Delete</button>
            </div>
        </div>
    </div>);
};

export default Task;