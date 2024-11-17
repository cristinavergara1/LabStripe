"use client";
import React from "react";

const ButtonCar = ({ product }) => {
    const addToCart = () => {
       
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProductIndex = storedCart.findIndex((item) => item.id === product.id);

        if (existingProductIndex >= 0) {
            storedCart[existingProductIndex].quantity += 1;
        } else {
            storedCart.push({ ...product, quantity: 1 });
        }

   
        localStorage.setItem("cart", JSON.stringify(storedCart));


        alert(`${product.name} agregado al carrito!`);
    };

    return (
        <button 
            onClick={addToCart} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            Agregar al carrito
        </button>
    );
};

export default ButtonCar;
