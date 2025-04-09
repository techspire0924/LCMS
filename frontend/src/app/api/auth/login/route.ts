import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/app/utils/db';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Query the database for the user
    const result = await query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    // Check if user exists and password matches
    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const user = result.rows[0];
    
    // In a real application, you would use a proper password hashing library
    // and compare the hashed passwords
    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Return success with user data (excluding password)
    const { password: _, ...userData } = user;
    
    return NextResponse.json({
      message: 'Login successful',
      user: userData
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
