import { authenticateLogIn } from '@/apis/auth/authenticateLogin';
import { authenticateSignUp } from '@/apis/auth/authenticateSignUp';
import { getUser } from '@/apis/auth/getUser';
import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useSnackBar } from './SnackbarProvider';
import { UserProfile } from '@/types/types';

interface User {
  profile: UserProfile | null;
  name: string;
  id: number;
}

type signUpParams = Record<'email' | 'name' | 'password' | 'passwordConfirmation', string>;
type logInParams = Record<'email' | 'password', string>;

interface AuthContextValue {
  isLoggedIn: boolean;
  user: User | null;
  syncUserAuthState: () => Promise<void>;
  signUp: (formData: signUpParams) => Promise<boolean>;
  logIn: (formData: logInParams) => Promise<void>;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { openSnackBar } = useSnackBar();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const initAuthenticatedUser = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
    setCookie('accessToken', accessToken);
    setCookie('refreshToken', refreshToken);
    syncUserAuthState();
    setIsLoggedIn(true);
    router.push('/home');
  };

  const signUp = useCallback(
    async ({ email, name, password, passwordConfirmation }: signUpParams): Promise<boolean> => {
      try {
        const response = await authenticateSignUp({
          email,
          name,
          password,
          passwordConfirmation,
        });
        if (response) {
          const { accessToken, refreshToken } = response;
          initAuthenticatedUser({ accessToken, refreshToken });
          return true;
        }
      } catch (error) {
        if (error instanceof Error) {
          openSnackBar({ type: 'error', content: error.message });
          return false;
        }
      }
      return false;
    },
    [],
  );

  const logIn = useCallback(async ({ email, password }: logInParams) => {
    try {
      const response = await authenticateLogIn({ email, password });
      if (response) {
        const { accessToken, refreshToken } = response;
        initAuthenticatedUser({ accessToken, refreshToken });
      }
    } catch (error) {
      if (error instanceof Error) {
        openSnackBar({ type: 'error', content: error.message });
      }
    }
  }, []);

  const logOut = useCallback(() => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    setIsLoggedIn(false);
    setUser(null);
    router.push('/landing');
  }, []);

  const syncUserAuthState = useCallback(async () => {
    const userInfoResponse = await getUser();

    if (userInfoResponse) {
      setUser(userInfoResponse);
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  const authContextValue = useMemo(
    () => ({
      isLoggedIn,
      user,
      syncUserAuthState,
      signUp,
      logIn,
      logOut,
    }),
    [user],
  );

  useEffect(() => {
    syncUserAuthState();
  }, []);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('반드시 AuthProvider 안에서 사용해야 합니다.');
  }

  return context;
};
