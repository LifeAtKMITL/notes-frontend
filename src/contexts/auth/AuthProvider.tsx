import Loading from 'components/loading';
import React, { useEffect, useState } from 'react';
import { useLiff } from 'react-liff';
import axios from 'utils/axios';

interface IAuthProvider {
  children: React.ReactNode;
}

interface IToken {
  token: string;
}

const AuthProvider = ({ children }: IAuthProvider): JSX.Element => {
  const [loadingToken, setLoadingToken] = useState(true);
  const { isLoggedIn, isReady, liff } = useLiff();

  useEffect(() => {
    if (!isLoggedIn) return;

    initApp();
  }, [liff, isLoggedIn]);

  const initApp = async () => {
    const tokenId = liff.getIDToken();
    if (!tokenId) return;

    const response = await login(tokenId);
    if (!response) return;

    const { token } = response;

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    setLoadingToken(false);
  };

  const login = async (userId: string) => {
    try {
      const response = await axios.post<IToken>('/auth', {
        userId,
      });
      return response.data;
    } catch (error) {
      return null;
    }
  };

  if (!isReady || loadingToken) return <Loading />;

  return <>{children}</>;
};

export default AuthProvider;
