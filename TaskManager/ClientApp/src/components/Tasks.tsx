import ITask from "../interfaces/ITask";
import Task from "./Task";

const Tasks = () => {
    const TEMP_TASKS: ITask[] = [
        { id: 'id1', title: 'Learn TypeScript', description: 'Learn and improve my TypeScript knowledge and experience', dateCreated: new Date(), dueDate: null },
        { id: 'id2', title: 'Learn React', description: 'Learn and improve my React knowledge and experience', dateCreated: new Date(), dueDate: null },
        { id: 'id3', title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', dateCreated: new Date(2020, 3, 4), dueDate: new Date(2021, 3, 4) },
        { id: 'id4', title: 'Lorem ipsum 2', description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', dateCreated: new Date(2022, 11, 11), dueDate: new Date(2022, 11, 25) },
        { id: 'id5', title: 'Lorem ipsum 3', description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.', dateCreated: new Date(2023, 5, 4), dueDate: new Date(2023, 9, 14) }
    ];

    const prepareTasks = (tasks: ITask[]) => {
        const data = tasks.map(x => {
            return <Task id={x.id} title={x.title} description={x.description} dateCreated={x.dateCreated} dueDate={x.dueDate ? x.dueDate : null} />;
        });

        return data;
    };

    const tasks = prepareTasks(TEMP_TASKS);

    return (<>
        {tasks}
    </>);
};

export default Tasks;