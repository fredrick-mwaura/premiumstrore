import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:8000'; 

// Login user
const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, credentials, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    const message = error.response?.data?.message || 
                   error.response?.data?.errors?.email?.[0] || 
                   'Login failed. Please check your credentials.';
    toast.error(message);
    throw error;
  }
};

// Register user
const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/register`, userData);
    
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    toast.error(error.response?.data?.message || 'Registration failed');
    throw error;
  }
};

// Logout user
const logoutUser = async () => {
  try {
    await axios.post(`${API_URL}/api/logout`, {});
    
    toast.success('Logged out successfully');
  } catch (error) {
    console.error('Logout failed:', error);
    toast.error('Logout failed');
    throw error;
  }
};

// Continue with Google
const handleGoogleLogin = async (tokenResponse, navigate) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/google`, {
      access_token: tokenResponse.access_token,
    }, {
      withCredentials: true, // Automatically send cookies for session
    });
    
    const { user, is_new_user } = response.data;
    
    toast.success('Logged in with Google!');
    
    if (is_new_user) {
      navigate('/profile');
    } else {
      navigate('/product');
    }
    
    return { user };
  } catch (error) {
    console.error('Google login failed:', error);
    toast.error(error.response?.data?.message || 'Google login failed');
    throw error;
  }
};
export {
  loginUser,
  registerUser,
  logoutUser,
  handleGoogleLogin,
};
