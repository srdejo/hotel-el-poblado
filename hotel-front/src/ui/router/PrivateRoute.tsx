import { useAuth } from "../../infrastructure/auth/useAuth";
import { JSX, useEffect } from 'react';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect(); // 👈 se dispara después del render
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading || !isAuthenticated) {
    return <p>Cargando...</p>;
  }

  return children;
};
