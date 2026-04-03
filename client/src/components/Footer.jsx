import React from 'react'
import { Link } from 'react-router-dom'
import { assets, footerLinks } from '../assets/assets'

function Footer() {
    return (
        <footer className="mt-24 border-t border-gray-200 bg-gray-50/50">
            {/* Top Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-16">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8">
                    
                    {/* Logo and Description */}
                    <div className="w-full lg:w-1/3">
                        <Link to="/" onClick={() => window.scrollTo(0,0)}>
                            <img className="w-36 md:w-40 hover:opacity-90 transition-opacity" src={assets.logo} alt="GreenCart Logo" />
                        </Link>
                        <p className="mt-6 text-gray-600 leading-relaxed text-sm md:text-base pr-4">
                            We bring the freshest groceries and snacks straight to your doorstep. Trusted by thousands, we make shopping effortless, affordable, and convenient for you and your family.
                        </p>
                        
                        <div className="flex items-center gap-4 mt-6">
                            {['facebook', 'twitter', 'instagram'].map((social) => (
                                <a key={social} href="#" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 shadow-sm">
                                    <span className="text-xs font-medium capitalize">{social[0]}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="w-full lg:w-2/3 flex flex-wrap justify-between gap-8 md:gap-10">
                        {footerLinks.map((section, index) => (
                            <div key={index} className="min-w-[120px]">
                                <h3 className="font-bold text-gray-900 text-base tracking-wide mb-5 uppercase">
                                    {section.title}
                                </h3>
                                <ul className="flex flex-col gap-3">
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <Link 
                                                to={link.url || "#"} 
                                                onClick={() => window.scrollTo(0,0)}
                                                className="text-gray-500 hover:text-primary text-sm font-medium transition-all duration-200 flex items-center group"
                                            >
                                                {/* Small arrow on hover */}
                                                <span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 mr-1 text-primary">›</span>
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Bottom Copyright Section */}
            <div className="border-t border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500 font-medium">
                        Copyright {new Date().getFullYear()} © <span className="text-primary font-semibold">GreenCart</span>. All Rights Reserved.
                    </p>
                    
                    {/* Fake Payment Badges for Trust */}
                    <div className="flex items-center gap-3 text-gray-400 text-xs font-semibold">
                        <span className="px-2 py-1 border border-gray-200 rounded">VISA</span>
                        <span className="px-2 py-1 border border-gray-200 rounded">MasterCard</span>
                        <span className="px-2 py-1 border border-gray-200 rounded">UPI</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer