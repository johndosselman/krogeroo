import { createBrowserRouter, redirect } from "react-router-dom";
import Root from "../components/Root";
import Error from "../components/Error";
import Home from "../components/Home";
import Lists from "../components/Lists";
import NewList from "../components/NewList";
import EditList from "../components/EditList";
import SearchLocations, {
  loader as searchLocationsLoader,
} from "../components/SearchLocations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "lists",
        element: <Lists />,
      },
      {
        path: "lists/new",
        element: <NewList />,
        children: [
          {
            path: "search",
            element: <SearchLocations />,
            loader: searchLocationsLoader,
          },
          {
            path: "location/:locationId",
            //element: <NewListFromLocation />,
          },
          {
            path: "blueprint/:blueprintId",
            //element: <NewListFromBlueprint />,
          },
        ],
      },
      {
        path: "lists/:listId/edit",
        element: <EditList />,
      },
    ],
  },
]);

export default router;
