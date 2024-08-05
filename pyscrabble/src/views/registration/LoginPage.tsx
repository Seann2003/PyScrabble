import React, { useState } from 'react';
import { Input } from "../../components/ui/Input.tsx";
import { Button } from '../../components/ui/Button.tsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {

    checkAuthStatus: () => Promise<void>;
}

const LoginPage: React.FC<LoginPageProps> = ({ checkAuthStatus }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(""); // State for error messages
    
    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); 
        axios.post('http://localhost:3000/auth/login', formData, { withCredentials: true })
            .then(async (response) => {
                const userType = response.data.user.type;
                await checkAuthStatus();
                if (userType === 2) {
                    navigate('/adminPage');
                } else {
                    navigate('/userPage');
                }
            })
            .catch((error) => {
                // Check if the error response is an "incorrect email" error
                if (error.response && error.response.status === 401) {
                    setError("Incorrect email or password");
                } else {
                    setError("An unexpected error occurred");
                }
                console.error('There was an error for login!', error);
            });
    };

    return (
        <section className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                        Log in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <div className="mb-4">
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <Input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    {error && (
                        <div className="text-red-600 text-center mt-4">
                            {error}
                        </div>
                    )}
                    <div>
                        <Button
                            type="submit"
                            variant={'default'}
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default LoginPage;
