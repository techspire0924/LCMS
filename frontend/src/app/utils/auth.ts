// Simple authentication utility functions

// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
  // Check if we're in the browser
  if (typeof window === 'undefined') {
    return false;
  }
  
  return sessionStorage.getItem('isAuthenticated') === 'true';
};

// Set authentication status
export const setAuthenticated = (status: boolean): void => {
  if (typeof window !== 'undefined') {
    if (status) {
      sessionStorage.setItem('isAuthenticated', 'true');
    } else {
      sessionStorage.removeItem('isAuthenticated');
    }
  }
};

// Login function
export const login = (username: string, password: string): boolean => {
  // Simple authentication logic
  if (username === 'root' && password === 'root') {
    setAuthenticated(true);
    return true;
  }
  return false;
};

// Logout function
export const logout = (): void => {
  setAuthenticated(false);
};
