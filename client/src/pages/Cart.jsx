import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'

const Cart = () => {
    const { user, products, currency, cartItems, setCartItems, removeFromCart, getCartCount, updateCartItem, navigate, getCartAmount, axios } = useAppContext()

    const [cartArray, setCartArray] = useState([])
    const [addresses, setAddresses] = useState([])
    const [showAddress, setShowAddress] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [paymentOption, setPaymentOption] = useState("COD")

    const getCart = () => {
        let tempArray = []
        for (const key in cartItems) {
            if (cartItems[key] > 0) {
                const product = products.find((item) => item._id === key)
                if (product) {
                    tempArray.push({ ...product, quantity: cartItems[key] })
                }
            }
        }
        setCartArray(tempArray)
    }

    const getUserAddress = async () => {
        try {
            const { data } = await axios.get('/api/address/get')
            if (data.success) {
                setAddresses(data.address)
                if (data.address.length > 0) {
                    setSelectedAddress(data.address[0])
                }
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message || "Failed to fetch addresses")
        }
    }

    const placeOrder = async () => {
        try {
            if (!selectedAddress) {
                return toast.error('Please Select an Address')
            }

            const orderData = {
                userId: user._id,
                items: cartArray.map(item => ({ product: item._id, quantity: item.quantity })),
                address: selectedAddress._id
            }

            // Place order with COD 
            if (paymentOption === 'COD') {
                const { data } = await axios.post('/api/order/cod', orderData)
                if (data.success) {
                    toast.success(data.message)
                    setCartItems({})
                    navigate('/my-order')
                } else {
                    toast.error(data.message)
                }
            } else {
                // Place order using Stripe 
                const { data } = await axios.post('/api/order/stripe', orderData)
                if (data.success) {
                    window.location.replace(data.url)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message || "Error placing order")
        }
    }

    useEffect(() => {
        if (products && products.length > 0 && cartItems) {
            getCart()
        }
    }, [products, cartItems])

    useEffect(() => {
        if (user) {
            getUserAddress()
        }
    }, [user])

    // Wait for data to load
    if (!products || products.length === 0) return null;

    if (cartArray.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
                <img src={assets.nav_cart_icon} alt="Empty Cart" className="w-24 h-24 mb-6 opacity-30 grayscale" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added any fresh groceries to your cart yet.</p>
                <button 
                    onClick={() => { navigate("/products"); window.scrollTo(0, 0); }} 
                    className="px-8 py-3 bg-primary hover:bg-primary-dull text-white font-medium rounded-full transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    Start Shopping
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-10 xl:gap-16">
            
            {/* Left Side: Cart Items */}
            <div className='flex-1'>
                <div className="flex items-end justify-between mb-6 pb-4 border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
                    <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {getCartCount()} Items
                    </span>
                </div>

                <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-gray-400 text-xs uppercase tracking-wider font-semibold pb-4">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                <div className="flex flex-col gap-4">
                    {cartArray.map((product, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 md:gap-0 items-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            
                            {/* Product Info */}
                            <div className="flex items-center gap-4">
                                <div 
                                    onClick={() => {
                                        navigate(`/products/${product.category.toLowerCase()}/${product._id}`)
                                        window.scrollTo(0, 0)
                                    }} 
                                    className="cursor-pointer w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-gray-50 flex items-center justify-center border border-gray-100 rounded-xl overflow-hidden"
                                >
                                    <img className="w-full h-full object-cover hover:scale-105 transition-transform" src={product.images[0]} alt={product.name} />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-semibold text-gray-800 text-lg md:text-base line-clamp-1">{product.name}</p>
                                    <p className="text-sm text-gray-500 mt-0.5">Weight: <span className="font-medium text-gray-700">{product.weight || "N/A"}</span></p>
                                    
                                    <div className='flex items-center gap-2 mt-2 bg-gray-50 border border-gray-200 rounded-lg w-fit px-2 py-1'>
                                        <p className="text-xs text-gray-500 font-medium">Qty:</p>
                                        <select 
                                            onChange={(e) => updateCartItem(product._id, Number(e.target.value))} 
                                            value={product.quantity} 
                                            className='bg-transparent outline-none text-sm font-semibold cursor-pointer'
                                        >
                                            {Array.from({ length: Math.max(product.quantity, 9) }).map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Subtotal */}
                            <div className="flex justify-between md:justify-center items-center px-2 md:px-0 mt-2 md:mt-0">
                                <span className="md:hidden text-sm text-gray-500 font-medium">Subtotal:</span>
                                <p className="font-bold text-gray-800">{currency}{(product.offerPrice * product.quantity).toFixed(2)}</p>
                            </div>

                            {/* Remove Action */}
                            <button 
                                onClick={() => removeFromCart(product._id)} 
                                className="w-full md:w-auto mx-auto p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                                aria-label="Remove item"
                            >
                                <img src={assets.remove_icon} alt="remove" className='w-5 h-5 opacity-70' />
                                <span className="md:hidden text-sm font-medium">Remove</span>
                            </button>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={() => { navigate("/products"); window.scrollTo(0, 0) }} 
                    className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-semibold hover:text-primary-dull transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Continue Shopping
                </button>
            </div>

            {/* Right Side: Order Summary */}
            <div className="w-full lg:w-[400px] flex-shrink-0">
                <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm lg:sticky lg:top-24">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                    
                    {/* Address Selection */}
                    <div className="mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100 relative">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Delivery Address</p>
                            <button onClick={() => setShowAddress(!showAddress)} className="text-xs text-primary font-semibold hover:underline">
                                Change
                            </button>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed font-medium">
                            {selectedAddress 
                                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}` 
                                : "No address found. Please add one."}
                        </p>

                        {/* Address Dropdown */}
                        {showAddress && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden z-20 animate-fade-in">
                                <div className="max-h-48 overflow-y-auto">
                                    {addresses.map((address, index) => (
                                        <div 
                                            key={index}
                                            onClick={() => { setSelectedAddress(address); setShowAddress(false); }} 
                                            className={`p-3 text-sm cursor-pointer border-b border-gray-50 hover:bg-primary/5 transition-colors ${selectedAddress?._id === address._id ? 'bg-primary/10 border-l-2 border-l-primary' : ''}`}
                                        >
                                            <p className="font-medium text-gray-800">{address.street}</p>
                                            <p className="text-gray-500 text-xs">{address.city}, {address.state}</p>
                                        </div>
                                    ))}
                                </div>
                                <button 
                                    onClick={() => navigate("/add-address")} 
                                    className="w-full p-3 text-sm text-primary font-semibold hover:bg-gray-50 border-t border-gray-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    + Add New Address
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Payment Method */}
                    <div className="mb-6">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Payment Method</p>
                        <select 
                            onChange={(e) => setPaymentOption(e.target.value)} 
                            value={paymentOption}
                            className="w-full border border-gray-200 bg-gray-50 text-gray-800 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium cursor-pointer appearance-none"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em 1.2em' }}
                        >
                            <option value="COD">Cash On Delivery</option>
                            <option value="Online">Online Payment (Stripe)</option>
                        </select>
                    </div>

                    <div className="border-t border-gray-200 my-6"></div>

                    {/* Cost Breakdown */}
                    <div className="space-y-3 text-sm font-medium">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span className="text-gray-800">{currency}{getCartAmount().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping Fee</span>
                            <span className="text-primary bg-primary/10 px-2 py-0.5 rounded text-xs font-bold">FREE</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Estimated Tax (2%)</span>
                            <span className="text-gray-800">{currency}{(getCartAmount() * 0.02).toFixed(2)}</span>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-4 mt-2">
                            <div className="flex justify-between items-center">
                                <span className="text-base font-bold text-gray-800">Total Amount</span>
                                <span className="text-xl font-black text-gray-900">
                                    {currency}{(getCartAmount() + (getCartAmount() * 0.02)).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={placeOrder} 
                        className="w-full py-4 mt-8 bg-primary hover:bg-primary-dull text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(22,163,74,0.39)] hover:shadow-[0_6px_20px_rgba(22,163,74,0.23)] hover:-translate-y-0.5 transition-all duration-200"
                    >
                        {paymentOption === "COD" ? "Place Order (COD)" : "Proceed to Checkout"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart