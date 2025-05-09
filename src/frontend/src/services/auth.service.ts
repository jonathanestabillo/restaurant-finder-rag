import { type IAuthService } from 'services/auth.interface';

// const API_URL = 'http://localhost:5000/api/auth/';

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

class AuthService implements IAuthService {
  login(email: string, password: string): Promise<User> {
    console.log('Logging in with email:', email);
    console.log('Logging in with password:', password);

    //TODO: Logging implementation.
    return Promise.resolve({
      id: '1',
      username: 'testuser',
      email: 'testemail'
    });
  }

  logout(): void {
    //TODO: Log out implementation.
  }

  getCurrentUser(): User | null {
    //TODO: Get Current User implementation.
    return null;
  }

  getToken(): string | null {
    //TODO: Get Token implementation.
    return null;
  }

  isAuthenticated(): boolean {
    //TODO: Is Authenticated implementation.
    return false;
  }
}

export default new AuthService();