import { createBrowserRouter, redirect } from "react-router-dom";
import Root from "../components/Root";
import Error from "../components/Error";
import Home from "../components/Home";
import AllLists, { loader as allListsLoader } from "../components/AllLists";
import NewList from "../components/NewList";
import List, {
  loader as listLoader,
  action as listAction,
} from "../components/List";
import SearchLocations, {
  loader as searchLocationsLoader,
} from "../components/SearchLocations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "lists",
        element: <AllLists />,
        loader: allListsLoader,
      },
      {
        path: "lists/new",
        element: <NewList />,
        children: [
          {
            index: true,
            loader: () => redirect("./search"),
          },
          {
            path: "search",
            element: <SearchLocations />,
            loader: searchLocationsLoader,
          },
        ],
      },

      {
        path: "lists/:listId",
        element: <List />,
        loader: listLoader,
        action: listAction,
      },
    ],
  },
]);

export default router;
