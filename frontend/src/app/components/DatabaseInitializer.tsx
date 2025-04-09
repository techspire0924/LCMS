'use client';

import { useEffect } from 'react';

export default function DatabaseInitializer() {
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        console.log('Initializing database...');
        const response = await fetch('/api/init-db');
        const data = await response.json();
        console.log('Database initialization response:', data);
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };

    initializeDatabase();
  }, []);

  // This component doesn't render anything
  return null;
}
