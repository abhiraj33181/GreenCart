import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams, useNavigate } from 'react-router-dom'
import { categories, assets } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
    const { products, searchQuery } = useAppContext()
    const { category } = useParams() 
    const navigate = useNavigate()

    const [filteredProducts, setFilteredProducts] = useState([])

    const currentCategoryText = category 
        ? categories.find((item) => item.path.toLowerCase() === category.toLowerCase())?.text || "Products"
        : "All Products"

    useEffect(() => {
        let tempProducts = products.filter(product => product.inStock);

        if (category) {
            tempProducts = tempProducts.filter(
                (product) => product.category.toLowerCase() === category.toLowerCase()
            );
        }

        if (searchQuery && searchQuery.length > 0) {
            tempProducts = tempProducts.filter((product) => 
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(tempProducts);
    }, [products, category, searchQuery]);

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-16'>
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
                
                {/* Left Sidebar */}
                <div className='hidden lg:block w-64 flex-shrink-0'>
                    <div className='sticky top-28 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm'>
                        <h3 className='text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100'>Categories</h3>
                        <ul className='flex flex-col gap-2'>
                            {/* "All Products" option */}
                            <li 
                                onClick={() => { navigate('/products'); window.scrollTo(0,0); }}
                                className={`cursor-pointer px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${!category ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-primary/10 hover:text-primary'}`}
                            >
                                All Products
                            </li>
                            {/*  categories */}
                            {categories.map((cat, index) => (
                                <li 
                                    key={index}
                                    onClick={() => { navigate(`/products/${cat.path.toLowerCase()}`); window.scrollTo(0,0); }}
                                    className={`cursor-pointer px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${category === cat.path.toLowerCase() ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-primary/10 hover:text-primary'}`}
                                >
                                    {cat.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Side */}
                <div className='flex-1'>
                    
                    {/* Mobile Category Menu */}
                    <div className='lg:hidden flex overflow-x-auto gap-3 pb-4 mb-4 custom-scrollbar snap-x'>
                        <button 
                            onClick={() => navigate('/products')}
                            className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium border whitespace-nowrap snap-center transition-colors ${!category ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary'}`}
                        >
                            All Products
                        </button>
                        {categories.map((cat, index) => (
                            <button 
                                key={index}
                                onClick={() => navigate(`/products/${cat.path.toLowerCase()}`)}
                                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium border whitespace-nowrap snap-center transition-colors ${category === cat.path.toLowerCase() ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary'}`}
                            >
                                {cat.text}
                            </button>
                        ))}
                    </div>

                    {/* Header */}
                    <div className='flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4'>
                        <div>
                            <h1 className='text-3xl font-bold text-gray-800 uppercase tracking-tight'>{currentCategoryText}</h1>
                            <div className='w-16 h-1 bg-primary rounded-full mt-2'></div>
                        </div>
                        
                        {/* Search Indicator */}
                        {searchQuery && (
                            <p className='text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg'>
                                Showing results for: <span className='font-semibold text-gray-800'>"{searchQuery}"</span>
                            </p>
                        )}
                    </div>

                    {/* Product Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6 animate-fade-in'>
                            {filteredProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        /* Product not available State UI */
                        <div className='flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-300'>
                            <div className='bg-white p-4 rounded-full shadow-sm mb-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className='text-xl font-bold text-gray-800'>No products found</h3>
                            <p className='text-gray-500 mt-2 max-w-sm'>
                                {searchQuery 
                                    ? `We couldn't find anything matching "${searchQuery}". Try adjusting your search.` 
                                    : "Looks like we are out of stock for this category right now. Check back soon!"}
                            </p>
                            {searchQuery && (
                                <button 
                                    onClick={() => navigate('/products')} // Or clear searchQuery
                                    className='mt-6 px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dull transition'
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default AllProducts