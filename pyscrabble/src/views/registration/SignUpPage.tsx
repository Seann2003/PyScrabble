import React, { useState } from 'react';
import { Input } from "../../components/ui/Input.tsx"
import { Button } from '../../components/ui/Button.tsx';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        placeholder='Example: abc123'
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                </form>
            </div>
        </section>
    )   


}

export default SignUpPage;

