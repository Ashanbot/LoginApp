import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface UserProfile {
  name: string;
  email: string;
  picture: string;
}

function UserDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const userProfile = location.state as UserProfile;
  const [showSuccess, setShowSuccess] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSuccess(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!userProfile) {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-50">
      {showSuccess && (
        <div className="fixed top-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold">
          ✓ Login Successful!
        </div>
      )}
      
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">User Details</h1>
        
        <div className="flex flex-col items-center gap-4">
          <img 
            src={userProfile.picture} 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-blue-500"
          />
          
          <div className="w-full space-y-3">
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600">Name</p>
              <p className="text-lg font-semibold">{userProfile.name}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg font-semibold">{userProfile.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 mt-4"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
