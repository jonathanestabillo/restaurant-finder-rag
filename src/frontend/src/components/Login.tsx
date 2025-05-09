import { useState, type FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { type User } from 'services/auth.service';
import { AuthContext } from '../App';

interface LoginProps {
  setCurrentUser: (user: User | null) => void;
}

function Login({ setCurrentUser }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const authService = useContext(AuthContext);
  
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    
    setMessage('');
    setLoading(true);

    try {
      const user = await authService.login(email, password);
      setCurrentUser(user);
      navigate('/dashboard');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const resMessage = error.response?.data?.message || error.message || 'An error occurred';
      setMessage(resMessage);
      setLoading(false);
    }
  };

  return (
    <div className='col-md-12 offset-md-6'>
      <div className='card'>
        <div className='card-header'>
          <h2 className='text-center'>Login</h2>
        </div>
        <div className='card-body'>
          <form onSubmit={handleLogin}>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>Email</label>
              <input
                type='email'
                className='form-control'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>Password</label>
              <input
                type='password'
                className='form-control'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className='d-grid'>
              <button 
                type='submit' 
                className='btn btn-primary' 
                disabled={loading}
              >
                {loading ? (
                  <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>
                ) : (
                  'Login'
                )}
              </button>
            </div>
            
            {message && (
              <div className='alert alert-danger mt-3' role='alert'>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;