import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './common/components/Loading';
import useExchangeToken from './hooks/useExchangeToken';


const OAuthCallback = () => {
  const navigate = useNavigate();
  const { mutate: exchangeToken, isPending, isSuccess, isError } = useExchangeToken();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const codeVerifier = localStorage.getItem('code_verifier');

    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
    } else {
      navigate('/', { replace: true });
    }
  }, [exchangeToken, navigate]);

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem('code_verifier'); 
      navigate('/', { replace: true });
    }
  }, [isSuccess, navigate]);

  if (isPending) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Loading />
        <p>Spotify Processing Login...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Login Failed</h2>
        <p>Please re-try login</p>
        <button onClick={() => navigate('/')}>Go back Home</button>
      </div>
    );
  }

  return <Loading />;
};

export default OAuthCallback;