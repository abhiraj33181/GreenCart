import { useEffect, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';

const SearchSuggestion = ({ setOpen }) => {
    const { searchQuery, setSearchQuery, suggestion, setSuggestion, navigate } = useAppContext();

    const wrapperRef = useRef(null);

    const handleSelect = (item) => {
        setSuggestion([]);
        setSearchQuery("");
        if (setOpen) setOpen(false);

        setTimeout(() => {
            navigate(`/products/${item.category.toLowerCase()}/${item._id}`);
        }, 0);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSuggestion([]);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => document.removeEventListener("click", handleClickOutside);
    }, [setSuggestion]);

    return (
        <div ref={wrapperRef} className="relative w-full lg:w-[350px]">

            {/*  Search Bar */}
            <div className="flex items-center text-sm gap-2 border border-gray-200 px-4 py-1.5 rounded-full bg-gray-50 hover:bg-white focus-within:bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 shadow-sm">
                <input
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={typeof searchQuery === 'string' ? searchQuery : ""}
                    className="py-1.5 w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                    type="text"
                    placeholder="Search for fresh groceries..."
                />
                <button className="p-1.5 rounded-full hover:bg-primary/10 transition-colors flex items-center justify-center group">
                    <img src={assets.search_icon} alt="search" className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </button>
            </div>

            {/* Suggestion Products */}
            {suggestion && suggestion.length > 0 && (
                <div className="absolute top-[calc(100%+10px)] left-0 w-full bg-white border border-gray-100 rounded-xl shadow-xl z-50 max-h-[300px] overflow-y-auto animate-fade-in custom-scrollbar">

                    {/* Header for dropdown */}
                    <div className="px-4 py-2 bg-gray-50/80 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0 z-10 backdrop-blur-sm">
                        Products
                    </div>

                    {/* Suggestion Items */}
                    {suggestion.map((item) => (
                        <div
                            key={item._id}
                            onClick={() => handleSelect(item)}
                            className="flex items-center gap-3 p-3 hover:bg-primary/5 cursor-pointer border-b border-gray-50 last:border-b-0 transition-colors duration-150 group"
                        >
                            {/* Product Image */}
                            <div className="w-12 h-12 flex-shrink-0 bg-gray-50 rounded border border-gray-100 overflow-hidden">
                                <img
                                    src={item.images[0]}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="flex-col flex-grow">
                                <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                                <p className="text-sm font-semibold text-primary mt-0.5">₹{item.price}</p>
                            </div>

                            <div className="text-gray-300 group-hover:text-primary transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchSuggestion