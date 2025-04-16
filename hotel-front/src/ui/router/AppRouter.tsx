import { Routes, Route } from "react-router";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { RoomsPage } from "../pages/RoomsPage";
import { AccountsPage } from "../pages/AccountsPage";
import { PrivateRoute } from "./PrivateRoute";
import StayDetailPage from "../pages/StayDetailPage";
import NewStayPage from "../pages/NewStayPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="habitaciones"
          element={
            <PrivateRoute>
              <RoomsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/estadia/:id"
          element={
            <PrivateRoute>
              <StayDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/nueva/estadia/:id"
          element={
            <PrivateRoute>
              <NewStayPage />
            </PrivateRoute>
          }
        />
        <Route
          path="cuentas"
          element={
            <PrivateRoute>
              <AccountsPage />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}
