"use client";
import React, { useEffect, useState } from 'react';
import ButtonCheckout from '../components/ButtonCheckout';
import { FiArrowLeft } from "react-icons/fi";


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
        <div className="container mx-auto py-10 px-4 lg:px-0">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Carrito de Compras</h1>
            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p className="text-lg text-gray-600">Tu carrito está vacío.</p>
                    <button 
                        onClick={() => window.location.href = '/pricing'} 
                        className="bg-blue-500 text-white px-6 py-3 rounded mt-6 hover:bg-blue-600 transition-colors"
                    >
                        Ir a la tienda
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {cartItems.map((item, index) => (
                        <div key={index} className="flex items-center border-b py-4 space-x-4">
                            <img src={item.productImage} alt={item.productName} className="w-24 h-24 object-cover rounded" />
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold text-gray-700">{item.productName}</h2>
                                <p className="text-lg text-gray-600">
                                    Precio: ${(item.unit_amount && !isNaN(item.unit_amount) ? (item.unit_amount / 100).toFixed(2) : "0.00")} {item.currency?.toUpperCase() || ''}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Mostrar el total del carrito */}
                    <div className="text-2xl font-semibold mt-6 text-right text-gray-800">
                        Total: ${totalAmount.toFixed(2)} USD
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <ButtonCheckout cartItems={cartItems} />
                        <button 
                            onClick={handleClearCart}
                            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                        >
                            Vaciar carrito
                        </button>
                        <button 
                        onClick={() => window.location.href = '/pricing'} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
>
                       <FiArrowLeft className="mr-2" /> {/* Esto agrega el ícono de flecha */}
                       Volver a la tienda
                       </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;