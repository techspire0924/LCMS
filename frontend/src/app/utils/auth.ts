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
export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    // Call the login API endpoint
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    // If login was successful, set authenticated status
    if (data.message === 'Login successful') {
      setAuthenticated(true);
      // Store user data if needed
      if (data.user) {
        sessionStorage.setItem('user', JSON.stringify(data.user));
      }
      return true;
    }

    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

// Logout function
export const logout = (): void => {
  setAuthenticated(false);
};
