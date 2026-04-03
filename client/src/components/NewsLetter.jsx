import React, { useState } from 'react'
import toast from 'react-hot-toast'

function NewsLetter() {
    const [email, setEmail] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault();
        toast.success("Thanks for subscribing to GreenCart deals!");
        setEmail("");
    }

    return (
        <div className="mt-20 mb-10 px-4 md:px-16 lg:px-24 xl:px-32">
            <div className="bg-primary/5 border border-primary/10 rounded-3xl py-12 px-6 flex flex-col items-center justify-center text-center shadow-sm">
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
                    Never Miss a <span className="text-primary">Deal!</span>
                </h2>
                <p className="md:text-lg text-gray-500 mt-3 max-w-xl">
                    Subscribe to get the latest offers, fresh arrivals, and exclusive discounts directly in your inbox.
                </p>

                <form 
                    onSubmit={onSubmitHandler} 
                    className="mt-8 flex items-center bg-white p-1.5 rounded-full shadow-md w-full max-w-lg border border-gray-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300"
                >
                    {/* Mail Icon */}
                    <div className="pl-4 pr-2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                    </div>

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="flex-1 bg-transparent border-none outline-none text-gray-700 px-2 py-2 placeholder-gray-400 w-full"
                        type="email"
                        placeholder="Enter your email address..."
                        required
                    />

                    <button 
                        type="submit" 
                        className="px-6 py-3 md:px-8 bg-primary hover:bg-primary-dull text-white font-medium rounded-full transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer transform hover:-translate-y-0.5"
                    >
                        Subscribe
                    </button>
                </form>
                
                <p className="text-xs text-gray-400 mt-4">
                    *We respect your privacy. No spam, ever.
                </p>

            </div>
        </div>
    )
}

export default NewsLetter