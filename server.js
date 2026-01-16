import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

const GITHUB_CLIENT_ID = 'Ov23lieFoy1lWNRqu63Z';
const GITHUB_CLIENT_SECRET = 'bf687264e66ced47cf26efcf9a34895c7ac6a7f0';

app.post('/api/github/callback', async (req, res) => {
  const { code } = req.body;
  console.log('Received code:', code);

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code
      },
      { headers: { Accept: 'application/json' } }
    );

    console.log('Token response:', tokenResponse.data);
    const accessToken = tokenResponse.data.access_token;

    // Get user profile
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    console.log('User data:', userResponse.data);
    
    res.json({
      name: userResponse.data.name || userResponse.data.login,
      email: userResponse.data.email || 'No public email',
      picture: userResponse.data.avatar_url
    });
  } catch (error) {
    console.error('GitHub auth error:', error.response?.data || error.message);
    res.status(500).json({ error: 'GitHub authentication failed' });
  }
});

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));
