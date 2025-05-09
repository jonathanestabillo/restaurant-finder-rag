import { type User } from './auth.service';

/**
 * Interface for authentication service
 */
export interface IAuthService {
  /**
   * Logs in a user with email and password
   * @param email User's email
   * @param password User's password
   * @returns Promise resolving to user information
   */
  login(email: string, password: string): Promise<User>;

  /**
   * Logs out the current user
   */
  logout(): void;

  /**
   * Gets the current authenticated user
   * @returns User information or null if not authenticated
   */
  getCurrentUser(): User | null;

  /**
   * Gets the authentication token
   * @returns Token string or null if not authenticated
   */
  getToken(): string | null;

  /**
   * Checks if a user is authenticated
   * @returns boolean indicating authentication status
   */
  isAuthenticated(): boolean;
}