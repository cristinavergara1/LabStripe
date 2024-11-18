// ButtonCar.jsx
"use client";
import React from 'react';

const ButtonCar = ({ product }) => {
    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        // Verifica que unit_amount sea un número válido antes de guardar el producto
        const validatedProduct = {
            ...product,
            unit_amount: product.unit_amount || 0, // Si falta el precio, coloca un valor predeterminado
        };
        
        cart.push(validatedProduct);
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    return (
        <button onClick={handleAddToCart} className="bg-blue-500 text-white py-2 px-4 rounded">
            Agregar al carrito
        </button>
    );
};

export default ButtonCar;
