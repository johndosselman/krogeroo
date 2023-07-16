import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./components/Root.jsx";
import Home from "./components/Home";
import Lists from "./components/Lists";
import Error from "./components/Error";
import EditList from "./components/EditList";
import NewList from "./components/NewList";
import ChainSelect from "./components/ChainSelect";
import LocationSelect from "./components/LocationSelect";
import { loader as locationSelectLoader } from "./components/LocationSelect";

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
            index: true,
            loader: () => redirect("/lists/new/chain-select"),
          },
          {
            path: "chain-select",
            element: <ChainSelect />,
          },
          {
            path: "location-select/:chain",
            element: <LocationSelect />,
            loader: ({ params }) => params.chain,
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
