import ITask from '../../interfaces/ITask';
import styles from './Task.module.css';

const Task: React.FC<ITask> = (model: ITask) => {
    debugger;
    return (<div className={styles.taskContainer} key={model.id}>
        <h1 className={styles.taskHeader}>{model.title}</h1>
        <p className={styles.taskDescription}>{model.description}</p>
        <p className={styles.taskDescription}>Created: {model.dateCreated.toLocaleString()}</p>
        <p className={styles.taskDescription}>Due date: {model.dueDate ? model.dueDate.toLocaleString() : 'No due date set'}</p>
    </div>);
};

export default Task;