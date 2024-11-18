// CartPage.jsx
"use client";
import React, { useEffect, useState } from 'react';
import ButtonCheckout from '../components/ButtonCheckout';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const handleClearCart = () => {
        localStorage.removeItem("cart");
        setCartItems([]);
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-5">Carrito de Compras</h1>
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <div>
                    {cartItems.map((item, index) => (
                        <div key={index} className="border-b py-3">
                            <h2 className="text-xl">{item.productName}</h2>
                            <p className="text-lg">
                                Precio: {(item.unit_amount && !isNaN(item.unit_amount) ? (item.unit_amount / 100).toFixed(2) : "0.00")} {item.currency?.toUpperCase() || ''}
                            </p>
                            {item.productImage && (
                                <img src={item.productImage} alt={item.productName} className="w-24 h-24 object-cover my-2" />
                            )}
                        </div>
                    ))}
                    <div className="mt-5">
                    <ButtonCheckout cartItems={cartItems} />
                        <button 
                            onClick={handleClearCart}
                            className="bg-red-600 text-white py-2 px-4 rounded ml-4"
                        >
                            Vaciar carrito
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
