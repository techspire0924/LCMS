// This script initializes the database when the application starts

export async function initializeApp() {
  try {
    // Only run in development mode and on the client side
    if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
      console.log('Initializing database...');
      
      // Call the init-db API endpoint
      const response = await fetch('/api/init-db');
      const data = await response.json();
      
      console.log('Database initialization response:', data);
    }
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}
