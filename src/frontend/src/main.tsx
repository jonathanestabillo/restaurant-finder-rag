import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import mockAuthService from 'services/auth.service.mock';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App authServiceImpl={mockAuthService} />
    {/** <App /> */}
  </StrictMode>,
);
