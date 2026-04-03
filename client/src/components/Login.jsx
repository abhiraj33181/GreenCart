import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

function Login() {
    const { setShowUserLogin, user, showUserLogin, setUser, axios, navigate } = useAppContext();

    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post(`/api/user/${state}`, {
                name, email, password
            });
            if (data.success) {
                setUser(data.user);
                navigate('/');
                setShowUserLogin(false);
                toast.success(state === "login" ? "Welcome back!" : "Account created successfully!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div 
            onClick={() => setShowUserLogin(false)} 
            className='fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 p-4'
        >
            {/* Modal Container */}
            <form 
                onSubmit={onSubmitHandler} 
                onClick={(e) => e.stopPropagation()} 
                className="relative flex flex-col gap-5 w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-gray-100 transform transition-all animate-fade-in"
            >
                {/* Close Button */}
                <button 
                    type="button"
                    onClick={() => setShowUserLogin(false)}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>

                {/* Header */}
                <div className="text-center mb-2">
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                        {state === "login" ? "Welcome Back " : "Join "} 
                        <span className="text-primary">GreenCart</span>
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        {state === "login" 
                            ? "Sign in to access your fresh groceries." 
                            : "Create an account to start shopping fresh."}
                    </p>
                </div>

                {/* Input Fields */}
                <div className="flex flex-col gap-4">
                    {state === "register" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input 
                                onChange={(e) => setName(e.target.value)} 
                                value={name} 
                                placeholder="John Doe" 
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 outline-none text-gray-800" 
                                type="text" 
                                required 
                            />
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            placeholder="you@example.com" 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 outline-none text-gray-800" 
                            type="email" 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            placeholder="••••••••" 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 outline-none text-gray-800" 
                            type="password" 
                            required 
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit"
                    className="w-full mt-2 py-3 px-4 bg-primary hover:bg-primary-dull text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                    {state === "register" ? "Create Account" : "Sign In"}
                </button>

                {/* Toggle Footer */}
                <div className="text-center mt-2 text-sm text-gray-600">
                    {state === "register" ? (
                        <p>
                            Already have an account?{' '}
                            <button 
                                type="button"
                                onClick={() => setState("login")} 
                                className="font-semibold text-primary hover:underline transition-all"
                            >
                                Log in
                            </button>
                        </p>
                    ) : (
                        <p>
                            New to greenCart?{' '}
                            <button 
                                type="button"
                                onClick={() => setState("register")} 
                                className="font-semibold text-primary hover:underline transition-all"
                            >
                                Sign up
                            </button>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Login;