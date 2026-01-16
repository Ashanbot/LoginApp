import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import UserDetails from './pages/UserDetails';
import GitHubCallback from './components/GitHubCallback';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/callback" element={<GitHubCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
