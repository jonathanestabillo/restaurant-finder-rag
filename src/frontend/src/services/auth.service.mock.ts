import { type IAuthService } from 'services/auth.interface';
import { type User } from 'services/auth.service';

/**
 * Mock implementation of the AuthService for testing
 */
export class MockAuthService implements IAuthService {
  private mockUser: User | null = null;
  private mockToken: string | null = null;
  private loginShouldFail = false;

  /**
   * Configure the mock to simulate a failed login
   */
  setLoginShouldFail(shouldFail: boolean): void {
    this.loginShouldFail = shouldFail;
  }

  /**
   * Set a mock user for testing
   */
  setMockUser(user: User | null): void {
    this.mockUser = user;
    if (user) {
      this.mockToken = 'mock-token-for-testing';
    } else {
      this.mockToken = null;
    }
  }

  login(email: string, password: string): Promise<User> {
    if (this.loginShouldFail) {
      console.log('Email:', email);
      console.log('Password:', password);
      return Promise.reject(new Error('Mock login failure'));
    }

    // Create a mock user for successful login
    const mockUser: User = {
      id: '123',
      username: 'testuser',
      email
    };

    this.mockUser = mockUser;
    this.mockToken = 'mock-auth-token';

    localStorage.setItem('user', JSON.stringify(this.mockUser));
    localStorage.setItem('token', this.mockToken);
    
    return Promise.resolve(mockUser);
  }

  logout(): void {
    this.mockUser = null;
    this.mockToken = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  getToken(): string | null {
    return this.mockToken;
  }

  isAuthenticated(): boolean {
    return !!this.mockToken;
  }
}

export default new MockAuthService();