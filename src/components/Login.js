import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_URL}/api/users/login`, { email, password });
            localStorage.setItem('token', res.data.token);
            alert('Login successful');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <form 
                onSubmit={handleLogin} 
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
            >
                <h2 className="text-3xl font-bold text-center text-blue-600">Login</h2>

                <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
                >
                    Login
                </button>
                <div className="mt-4 text-center">
                        <p className="text-gray-600">
                            Dont have an account? 
                            <Link to="/register" className="text-blue-600 hover:underline"> Register</Link>
                        </p>
                    </div>
            </form>
        </div>
    );
}

export default Login;
