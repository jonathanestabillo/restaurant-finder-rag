import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import authService, { type User } from 'services/auth.service';
import { type IAuthService } from 'services/auth.interface';

// Import components
import Home from 'components/Home';
import Login from 'components/Login';
import Dashboard from 'components/Dashboard';

// Import styles
import './App.css';

// Create a context for the auth service
export const AuthContext = createContext<IAuthService>(authService);

interface AppProps {
  authServiceImpl?: IAuthService;
}

function App({ authServiceImpl = authService }: AppProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = authServiceImpl.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, [authServiceImpl]);

  return (
    <AuthContext.Provider value={authServiceImpl}>
      <Router>
        <div className='App'>
          <div className='container mt-3'>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={
                  currentUser ? <Navigate to='/dashboard' /> : <Login setCurrentUser={setCurrentUser} />
                } />
                <Route path='/dashboard' element={
                  currentUser ? <Dashboard setCurrentUser={setCurrentUser} /> : <Navigate to='/login' />
                } />
              </Routes>
            )}
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
