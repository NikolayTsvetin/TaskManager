import { useEffect, useState } from "react";
import ITask from "../../interfaces/ITask";
import Task from "./Task";
import { getTasks } from "../../api/Tasks.api";
import NewTask from "./NewTask";

const Tasks = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [showCreateNew, setShowCreateNew] = useState<boolean>(false);

    useEffect(() => {
        const getTasksData = async () => setTasks(await getTasks());

        getTasksData();
    }, [tasks]);

    const toggleCreateNew = (): void => setShowCreateNew((prevState) => !prevState);

    const prepareTasks = (tasks: ITask[]) => {
        const data = tasks.map(x => <Task key={x.id} id={x.id} title={x.title} description={x.description} dateCreated={x.dateCreated} dueDate={x.dueDate ? x.dueDate : null} />);

        return data;
    };

    const tasksData = tasks == null || tasks.length === 0 ? 'Loading...' : prepareTasks(tasks);

    return (<>
        <button onClick={toggleCreateNew}>{ showCreateNew ? 'Hide' : 'Show' } create new task</button>
        {showCreateNew && <NewTask />}
        {tasksData}
    </>);
};

export default Tasks;