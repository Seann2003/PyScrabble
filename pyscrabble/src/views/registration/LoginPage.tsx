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
                alert("Login successful!");
                const userType = response.data.user.type;
                localStorage.setItem('userType', userType.toString());
                await checkAuthStatus();
                if (userType === 2) {
                    navigate('/adminPage');
                } else {
                    navigate('/userPage');
                }
            })
            .catch((err) => {
                setError("Incorrect email/password");
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
                <form className="flex flex-col mt-8 space-y-6" onSubmit={handleSubmit}>
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
                    
                    {error && (
                        <div className="text-red-600 text-center mt-4">
                            {error}
                        </div>
                    )}
                    
                    <Button
                        type="submit"
                        variant={'default'}
                    >
                        Login
                    </Button>
                </form>
            </div>
        </section>
    );
}

export default LoginPage;
