
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // Cargar la cantidad de artículos del carrito desde el almacenamiento local al cargar el componente
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(cartItems.length);

        // Escuchar cambios en el carrito para actualizar el contador en el ícono del carrito
        const updateCartCount = () => {
            const updatedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
            setCartCount(updatedCartItems.length);
        };

        // Evento personalizado para actualizar el contador del carrito
        window.addEventListener("cartUpdated", updateCartCount);

        // Limpiar el listener cuando el componente se desmonte
        return () => {
            window.removeEventListener("cartUpdated", updateCartCount);
        };
    }, []);

    return (
        <section className="shadow-xl bg-white sticky top-0">
            <div className="container mx-auto py-2 text-[24px] flex justify-between items-center">
                <div className="cursor-pointer">
                    <Link href="/">Tienda deportiva Barbosa</Link>
                </div>
                <div className="relative cursor-pointer">
                    <Link href="/cart">
                        <div className="relative">
                            <FiShoppingCart />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
