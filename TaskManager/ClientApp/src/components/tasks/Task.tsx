import ITask from '../../interfaces/ITask';
import styles from './Task.module.css';
import { deleteTask } from '../../api/Tasks.api';
import IHttpResponseObject from '../../interfaces/IHttpResponseObject';
import { useState } from 'react';
import EditTask from './EditTask';

const Task: React.FC<ITask> = (model: ITask) => {
    const [showEdit, setShowEdit] = useState<boolean>(false);

    const dateCreatedParsed: Date = new Date(model.dateCreated.toString());
    let dueDateDisplay: string = 'No due date set';

    if (model.dueDate) {
        const dueDateParsed: Date = new Date(model.dueDate.toString());
        dueDateDisplay = dueDateParsed.toDateString();
    }

    const onDelete = async (id: string): Promise<void> => {
        // todo: add confirmation

        const result: IHttpResponseObject = await deleteTask(id);

        if (result.errors) {
            throw new Error(`Failed to delete Task with id: ${id}. Error: ${result.errors}`);
        }
    };

    const toggleEdit = (): void => setShowEdit((prevState) => !prevState);

    return (<div className={`${styles.taskContainer} ${styles.taskSeparator}`} key={model.id}>
        <div className={styles.taskContent}>
            <div className={styles.taskInfo}>
                <h1 className={styles.taskHeader}>{model.title}</h1>
                <p className={styles.taskDescription}>{model.description}</p>
                <p className={styles.taskDescription}>Created: {dateCreatedParsed.toDateString()}</p>
                <p className={styles.taskDescription}>Due date: {dueDateDisplay}</p>
            </div>
            <div className={styles.taskButtons}>
                <button className={styles.button} onClick={toggleEdit}>{showEdit ? 'Cancel editing' : 'Edit'}</button>
                {showEdit && <EditTask id={model.id} title={model.title} description={model.description} dueDate={model.dueDate} dateCreated={model.dateCreated} />}
                <button className={styles.button}>Mark as completed</button>
                <button className={`${styles.button} ${styles.deleteButton}`} onClick={() => onDelete(model.id)}>Delete</button>
            </div>
        </div>
    </div>);
};

export default Task;