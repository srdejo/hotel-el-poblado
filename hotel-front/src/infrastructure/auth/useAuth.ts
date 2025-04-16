import { useAuth0 } from '@auth0/auth0-react';

export const useAuth = () => {
  const { user, loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
  return { user, loginWithRedirect, logout, isAuthenticated, isLoading };
};
