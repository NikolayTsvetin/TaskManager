import Home from "./components/Home";
import CalendarView from "./components/calendar/CalendarView";
import ExpensesTracker from "./components/expenses/ExpensesTracker";
import Tasks from "./components/tasks/Tasks";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/tasks',
        element: <Tasks />
    },
    {
        path: '/calendar',
        element: <CalendarView />
    },
    {
        path: '/expenses',
        element: <ExpensesTracker />
    }
];

export default AppRoutes;
