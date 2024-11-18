
"use client";
import React, { useState } from 'react';

const ButtonCar = ({ product }) => {
    const [showNotification, setShowNotification] = useState(false);

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        const validatedProduct = {
            ...product,
            unit_amount: product.unit_amount || 0, // Si falta el precio, coloca un valor predeterminado
        };
        
        cart.push(validatedProduct);
        localStorage.setItem("cart", JSON.stringify(cart));

        // Mostrar la notificación y ocúltarla después de 2 segundos
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);

        // Disparar el evento personalizado para actualizar el contador del carrito
        window.dispatchEvent(new Event("cartUpdated"));
    };

    return (
        <div className="relative">
            <button onClick={handleAddToCart} className="bg-blue-500 text-white py-2 px-4 rounded">
                Agregar al carrito
            </button>
            
            {/* Notificación en la parte superior de la pantalla */}
            {showNotification && (
                <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-md z-50">
                    Producto añadido al carrito
                </div>
            )}
        </div>
    );
};

export default ButtonCar;
