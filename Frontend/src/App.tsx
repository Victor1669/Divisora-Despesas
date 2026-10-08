import { Outlet, useLoaderData } from "react-router";
import { Navbar } from "./components/Navbar";
import { UsuarioContext } from "./config/UsuarioContext";
import { carregarUsuario } from "./services/auth";

export default function App() {
  const usuario = useLoaderData<typeof carregarUsuario>();

  return (
    <UsuarioContext.Provider value={usuario}>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </UsuarioContext.Provider>
  );
}
