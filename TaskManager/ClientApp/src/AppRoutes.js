import Home from "./components/Home";
import Tasks from "./components/tasks/Tasks";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/tasks',
        element: <Tasks />
    }
];

export default AppRoutes;
