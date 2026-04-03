import { useState } from 'react'
import { NavLink } from "react-router-dom"
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import SearchSuggestion from './SearchSuggestion'

const Navbar = () => {
    const [open, setOpen] = useState(false)

    const { user, setUser, setShowUserLogin, navigate, getCartCount, axios } = useAppContext()
    
    const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout')
            if (data.success) {
                toast.success(data.message)
                setUser(null);
                navigate("/")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const desktopNavLink = ({ isActive }) => 
        `transition-all duration-200 border-b-2 py-1 ${isActive ? 'text-primary font-semibold border-primary' : 'text-gray-600 border-transparent hover:text-primary hover:border-primary/50'}`

    const mobileNavLink = ({ isActive }) => 
        `block w-full px-4 py-2 text-base font-medium transition-colors ${isActive ? 'text-primary bg-primary/10 border-l-4 border-primary' : 'text-gray-600 hover:text-primary hover:bg-gray-50 border-l-4 border-transparent'}`

    return (
        <nav className="fixed top-0 w-full px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-4 border-b border-gray-200 bg-white shadow-sm transition-all z-40">
            
            <div className="flex items-center justify-between w-full">
                
                {/* Logo */}
                <NavLink to="/" onClick={() => setOpen(false)} className="flex-shrink-0">
                    <img className="h-8 md:h-9 hover:opacity-90 transition-opacity object-cover" src={assets.logo} alt="GreenCart Logo" />
                </NavLink>

                {/* Search Box - Hidden on Mobile, Centered on Desktop */}
                <div className="hidden md:block flex-1 max-w-sm lg:max-w-md mx-6">
                    <SearchSuggestion setOpen={setOpen} />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-shrink-0">
                    <NavLink to="/" className={desktopNavLink} end>Home</NavLink>
                    <NavLink to="/products" className={desktopNavLink}>All Products</NavLink>
                    <NavLink to="/contact" className={desktopNavLink}>Contact</NavLink>

                    {/* Cart Icon */}
                    <div onClick={() => navigate("/cart")} className="relative cursor-pointer group p-1">
                        <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80 group-hover:opacity-100 transition-opacity" />
                        <button className="absolute -top-1 -right-2 text-[10px] font-bold text-white bg-primary w-5 h-5 rounded-full shadow-md flex items-center justify-center transform group-hover:scale-110 transition-transform">
                            {getCartCount()}
                        </button>
                    </div>

                    {/* User Auth / Profile */}
                    {!user ? (
                        <button 
                            onClick={() => setShowUserLogin(true)} 
                            className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition-colors text-white font-medium rounded-full shadow-sm hover:shadow-md"
                        >
                            Login
                        </button>
                    ) : (
                        <div className="relative group">
                            <img src={assets.profile_icon} className="w-10 h-10 rounded-full cursor-pointer border border-gray-200 hover:border-primary transition-colors p-0.5" alt="profile" />
                            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow-lg border border-gray-100 py-2 w-36 rounded-xl text-sm z-50 overflow-hidden animate-fade-in">
                                <li onClick={() => navigate("my-order")} className="px-4 py-2.5 text-gray-700 hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors">
                                    My Orders
                                </li>
                                <li onClick={logout} className="px-4 py-2.5 text-red-600 hover:bg-red-50 cursor-pointer transition-colors">
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Mobile Hamburger & Cart */}
                <div className="flex md:hidden items-center gap-4 flex-shrink-0">
                    <div onClick={() => navigate("/cart")} className="relative cursor-pointer mr-2">
                        <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
                        <button className="absolute -top-2 -right-3 text-[10px] font-bold text-white bg-primary w-5 h-5 rounded-full shadow-md flex items-center justify-center">
                            {getCartCount()}
                        </button>
                    </div>
                    <button onClick={() => setOpen(!open)} aria-label="Menu" className="p-1">
                        <img src={assets.menu_icon} alt="menu" className={`w-6 h-6 transition-transform duration-200 ${open ? 'rotate-90' : 'rotate-0'}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`${open ? 'max-h-[80vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'} absolute top-[60px] md:top-[70px] left-0 w-full bg-white shadow-lg flex flex-col items-start transition-all duration-300 ease-in-out md:hidden`}>
                <div className="w-full py-2 flex flex-col gap-1">
                    
                    {/* Search Bar inside Mobile Menu */}
                    <div className="px-4 py-3 mb-2 border-b border-gray-100">
                        <SearchSuggestion setOpen={setOpen} />
                    </div>

                    <NavLink to="/" onClick={() => setOpen(false)} className={mobileNavLink} end>Home</NavLink>
                    <NavLink to="/products" onClick={() => setOpen(false)} className={mobileNavLink}>All Products</NavLink>
                    {user && (
                        <NavLink to="/my-order" onClick={() => setOpen(false)} className={mobileNavLink}>My Orders</NavLink>
                    )}
                    <NavLink to="/contact" onClick={() => setOpen(false)} className={mobileNavLink}>Contact Us</NavLink>
                    
                    <div className="px-4 py-4 border-t border-gray-100 mt-2">
                        {!user ? (
                            <button onClick={() => {
                                setOpen(false);
                                setShowUserLogin(true)
                            }} className="w-full cursor-pointer px-6 py-2.5 bg-primary hover:bg-primary-dull transition-colors text-white font-medium rounded-full text-sm shadow-sm">
                                Login to GreenCart
                            </button>
                        ) : (
                            <button onClick={() => {
                                setOpen(false);
                                logout();
                            }} className="w-full cursor-pointer px-6 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium rounded-full text-sm">
                                Log Out
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar