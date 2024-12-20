import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { authActions } from '@/redux/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser, isAuthenticated } = useSelector((state) => state.auth.authDetails);

  useEffect(() => {
    const cookies = parseCookies();
    const hasAuthCookie = cookies.authToken;
    
    if (!hasAuthCookie) {
      dispatch(authActions.clearCurrentUser());
      if (window.location.pathname !== '/login') {
        router.push('/login');
      }
    }
  }, [dispatch, router]);

  return {
    user: currentUser,
    isAuthenticated: isAuthenticated || !!parseCookies().authToken
  };
}; 