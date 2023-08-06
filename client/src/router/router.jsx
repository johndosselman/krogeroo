import { createBrowserRouter, redirect } from "react-router-dom";
import RootRoute from "../routes/RootRoute";
import ErrorRoute from "../routes/ErrorRoute";
import HomeRoute from "../routes/HomeRoute";
import ListsRoute, { loader as listsLoader } from "../routes/ListsRoute";
import NewListRoute from "../routes/NewListRoute";
import ListRoute, {
  loader as listLoader,
  action as listAction,
} from "../routes/ListRoute";
import SearchLocationsRoute, {
  loader as searchLocationsLoader,
} from "../routes/SearchLocationsRoute";
import AddItemRoute, {
  action as addItemAction,
  loader as addItemLoader,
} from "../routes/AddItemRoute";
import ListItemsRoute from "../routes/ListItemsRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    errorElement: <ErrorRoute />,
    children: [
      { path: "", element: <HomeRoute /> },
      {
        path: "lists",
        element: <ListsRoute />,
        loader: listsLoader,
      },
      {
        path: "lists/new",
        element: <NewListRoute />,
        children: [
          {
            index: true,
            loader: () => redirect("./search"),
          },
          {
            path: "search",
            element: <SearchLocationsRoute />,
            loader: searchLocationsLoader,
          },
        ],
      },

      {
        path: "lists/:listId",
        element: <ListRoute />,
        loader: listLoader,
        action: listAction,
        id: "list",
        children: [
          {
            path: "",
            element: <ListItemsRoute />,
          },
          {
            path: "add-item",
            element: <AddItemRoute />,
            loader: addItemLoader,
            action: addItemAction,
          },
        ],
      },
    ],
  },
]);

export default router;
