"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(cartItems.length);

        const updateCartCount = () => {
            const updatedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
            setCartCount(updatedCartItems.length);
        };

        window.addEventListener("cartUpdated", updateCartCount);

        return () => {
            window.removeEventListener("cartUpdated", updateCartCount);
        };
    }, []);

    return (
        <section className="shadow-xl bg-gradient-to-r bg-[#0d85f2] text-white sticky top-0 z-50">
            <div className="container mx-auto py-4 text-2xl flex justify-between items-center px-4">
                <div className="text-3xl font-bold cursor-pointer">
                    <Link href="/">Tienda Deportiva Barbosa</Link>
                </div>
                <div className="relative cursor-pointer">
                    <Link href="/cart">
                        <div className="relative flex items-center">
                            <FiShoppingCart className="text-5xl" /> 
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Navbar;