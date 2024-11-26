import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./UI/Auth/Login";
import DashBoard from "@/UI/DashBoard/DashBoard";
import Register from "./UI/Auth/Register";

const routing = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          {routing.map((routes) => {
            return (
              <Route
                key={routes.path}
                path={routes.path}
                element={routes.element}
              />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
