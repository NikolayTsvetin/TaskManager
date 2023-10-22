import { FetchData } from "./components/FetchData";
import Home from "./components/Home";
import TestCounter from "./components/TestCounter";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/testcounter',
        element: <TestCounter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    }
];

export default AppRoutes;
