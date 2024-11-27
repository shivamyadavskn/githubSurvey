import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./UI/Auth/Login";
import DashBoard from "@/UI/DashBoard/DashBoard";

const routing = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
  }
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
