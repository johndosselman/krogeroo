import { createBrowserRouter, redirect } from "react-router-dom";
import Root from "../routes/Root";
import Error from "../routes/Error";
import Home from "../routes/Home";
import AllLists, { loader as allListsLoader } from "../routes/AllLists";
import NewList from "../routes/NewList";
import List, {
  loader as listLoader,
  action as listAction,
} from "../routes/List";
import SearchLocations, {
  loader as searchLocationsLoader,
} from "../routes/SearchLocations";

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
