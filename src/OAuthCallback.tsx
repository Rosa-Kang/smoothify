import { useEffect, useRef } from 'react';
import useExchangeToken from './hooks/useExchangeToken';

// const OAuthCallback = () => {
//   const navigate = useNavigate();
//   const { mutate: exchangeToken } = useExchangeToken();
//   const hasProcessed = useRef(false);

//   useEffect(() => {
//     if (hasProcessed.current) return;
    
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get('code');
//     const codeVerifier = localStorage.getItem('code_verifier');

//     if (code && codeVerifier) {
//       hasProcessed.current = true;
//       exchangeToken({ code, codeVerifier }, {
//         onSuccess: () => {
//           localStorage.removeItem('code_verifier');
//           navigate('/', { replace: true });
//         },
//         onError: (error) => {
//           console.error('OAuth error:', error);
//           navigate('/', { replace: true });
//         }
//       });
//     } else {
//       navigate('/', { replace: true });
//     }
//   }, [exchangeToken, navigate]);

//   return <div>Processing Spotify login...</div>;
// };


const OAuthCallback = () => {
  const { mutate: exchangeToken, isSuccess, isError, isPending } = useExchangeToken();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const codeVerifier = localStorage.getItem('code_verifier');

    if (code && codeVerifier) {
      hasProcessed.current = true;
      exchangeToken({ code, codeVerifier });
    } else {
      window.location.href = '/';
    }
  }, [exchangeToken]);

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem('code_verifier');
      window.location.href = '/';
    }
    if (isError) {
      window.location.href = '/';
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localStorage.getItem('access_token')) {
        localStorage.removeItem('code_verifier');
        window.location.href = '/';
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return <div>Processing Spotify login... {isPending && '(Loading...)'}</div>;
};

export default OAuthCallback;