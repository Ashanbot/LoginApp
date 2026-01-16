import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GitHubCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    const error = new URLSearchParams(window.location.search).get('error');
    
    if (error) {
      console.log('GitHub auth cancelled or failed');
      navigate('/', { state: { error: 'GitHub login was cancelled or failed' } });
      return;
    }
    
    console.log('GitHub callback code:', code);
    
    if (code) {
      fetch('http://localhost:3001/api/github/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
        .then(res => res.json())
        .then(profile => {
          if (profile.error) {
            navigate('/', { state: { error: 'GitHub authentication failed' } });
          } else {
            console.log('GitHub profile received:', profile);
            navigate('/user-details', { state: profile });
          }
        })
        .catch(err => {
          console.error('GitHub auth error:', err);
          navigate('/', { state: { error: 'GitHub authentication failed' } });
        });
    } else {
      console.log('No code found, redirecting to home');
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl">Processing GitHub login...</div>
    </div>
  );
}

export default GitHubCallback;
