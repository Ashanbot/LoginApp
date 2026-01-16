import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useLocation } from 'react-router-dom';

interface UserProfile {
  name: string;
  email: string;
  picture: string;
}

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.error) {
      setError(location.state.error);
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }
    const profile: UserProfile = {
      name: username,
      email: `${username}@example.com`,
      picture: 'https://via.placeholder.com/150'
    };
    navigate('/user-details', { state: profile });
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    const decoded: any = jwtDecode(credentialResponse.credential);
    const profile: UserProfile = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture
    };
    navigate('/user-details', { state: profile });
  };

  const handleGoogleError = () => {
    setError('Google login failed or was cancelled');
  };

  const handleGithubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&redirect_uri=${window.location.origin}/callback`;
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-3xl font-bold mb-8">Login</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-80">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>

        <div className="text-gray-500 my-2">OR</div>
        
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />

        <button
          onClick={handleGithubLogin}
          className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
          Sign in with GitHub
        </button>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginForm;
