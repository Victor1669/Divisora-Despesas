import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { carregarUsuario } from "./services/auth";
import { Erro } from "./pages/Erro";
import { NaoEncontrado } from "./pages/NaoEncontrado";

const router = createBrowserRouter([
  {
    errorElement: <Erro />,
    children: [
      { path: "/login", lazy: () => import("./pages/Login") },
      {
        path: "/",
        loader: carregarUsuario,
        shouldRevalidate: () => false,
        Component: App,
        children: [
          {
            errorElement: <Erro />,
            children: [
              { index: true, lazy: () => import("./pages/Dashboard") },
              { path: "despesas", lazy: () => import("./pages/Despesas") },
              { path: "historico", lazy: () => import("./pages/Historico") },
              {
                path: "participantes",
                lazy: () => import("./pages/Participantes"),
              },
              { path: "perfil", lazy: () => import("./pages/Perfil") },
            ],
          },
        ],
      },
      { path: "*", Component: NaoEncontrado },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>,
);
