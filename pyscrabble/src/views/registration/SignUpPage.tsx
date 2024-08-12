import React, { useState } from 'react';
import { Input } from "../../components/ui/Input.tsx"
import axios from 'axios';
import { Button } from '../../components/ui/Button.tsx';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(""); // State for error messages
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', formData);
            alert('Account has been created successfully!');
            navigate('/login');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setError(error.response.data.error);
                } else {
                    setError('An unknown error occurred.');
                }
            } else {
                setError('Network error, please try again.');
            }
        }
    };

    return (
        <section className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <div className="mb-4">
                            <label htmlFor="username" className='block text-sm font-medium text-gray-700'>
                                Username
                            </label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder='Example: johnwick'
                                autoComplete="username"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                className='mb-4'
                            />
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <Input
                                id="email-address"
                                name="email"
                                type="email"
                                placeholder='Example: johnwick@gmail.com'
                                autoComplete="email"
                                required
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
                                placeholder='Must be at least 8 characters'
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Button
                            type="submit"
                            variant={'default'}
                        >
                            Sign in
                        </Button>
                    </div>
                    {error && (
                        <div className="text-red-600 text-center mt-4">
                            {error}
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}

export default SignUpPage;
