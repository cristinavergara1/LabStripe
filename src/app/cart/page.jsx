// CartPage.jsx
"use client";
import React, { useEffect, useState } from 'react';
import ButtonCheckout from '../components/ButtonCheckout';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);

        // Calcular el total al cargar el carrito
        const total = storedCart.reduce((acc, item) => acc + (item.unit_amount || 0), 0);
        setTotalAmount(total / 100); // Convertimos de centavos a la moneda principal
    }, []);

    const handleClearCart = () => {
        localStorage.removeItem("cart");
        setCartItems([]);
        setTotalAmount(0); // Resetear el total
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-5">Carrito de Compras</h1>
            {cartItems.length === 0 ? (
                <div>
                    <p>Tu carrito está vacío.</p>
                    <button 
                        onClick={() => window.location.href = '/pricing'} 
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    >
                        Ir a la tienda
                    </button>
                </div>
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
                    
                    {/* Mostrar el total del carrito */}
                    <div className="text-xl font-semibold mt-5">
                        Total: {totalAmount.toFixed(2)} USD
                    </div>

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
