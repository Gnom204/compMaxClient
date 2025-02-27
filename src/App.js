import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Games from "./pages/Games/Games";
import Computer from "./pages/Computer/Computer";
import Home from "./pages/Home/Home";
import AdminPage from "./pages/AdminPage/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage/LoginPage";
import AddGames from "./pages/AddGames/AddGames";
import AddComp from "./pages/AddComp/AddComp";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { AuthProvider } from "./components/AuthContext";
import { CartProvider } from "./components/CartContext";
import OrderPage from "./pages/OrderPage/OrderPage";
import MoreInfoGame from "./components/MoreInfoGame/MoreInfoGame";
import MoreInfoComp from "./components/MoreInfoComp/MoreInfoComp";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/games",
        element: <Games />,
      },
      {
        path: "/computers",
        element: <Computer />,
      },
      {
        path: "/cart",
        element: <OrderPage />,
      },
      {
        path: "/games/:id",
        element: <MoreInfoGame />,
      },
      {
        path: "/computers/:id",
        element: <MoreInfoComp />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "add-game",
            element: (
              <ProtectedRoute>
                <AddGames />
              </ProtectedRoute>
            ),
          },
          {
            path: "add-comp",
            element: (
              <ProtectedRoute>
                <AddComp />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
