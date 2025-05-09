import { type FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { type User } from 'services/auth.service';
import { AuthContext } from '../App';

interface DashboardProps {
  setCurrentUser: (user: User | null) => void;
}

function Dashboard({ setCurrentUser }: DashboardProps) {
  const authService = useContext(AuthContext);
  const currentUser = authService.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = (e: FormEvent) => {
    e.preventDefault();
    authService.logout();
    setCurrentUser(null);
    // Redirect to login page after logout
    navigate('/login', { replace: true });
  };

  return (
    <div className='container'>
      <header className='jumbotron'>
        <h1>Dashboard</h1>
        <p>Welcome, {currentUser?.username}!</p>
        <p>This is a protected page only visible to authenticated users</p>
      </header>
      <div className='row'>RESTAURANT SEARCH PAGE GOES HERE!!!</div>
      <form onSubmit={handleLogout}>
        <div className='d-grid'>
          <button type='submit' className='btn btn-primary'>
            Logout
          </button>
        </div>
      </form>
    </div>
  );
}

export default Dashboard;
