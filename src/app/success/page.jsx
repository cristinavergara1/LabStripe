"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

function SuccessPage() {
  useEffect(() => {
    // Limpiar el carrito del localStorage cuando el pago sea exitoso
    localStorage.removeItem("cart");
  }, []); // solo se ejecutará una vez cuando se cargue la página de éxito.

  return (
    <div className="container mx-auto py-10 text-center">
      <h1 className="text-3xl font-bold mb-5">¡Pago Exitoso!</h1>
      {/* Ruta de la imagen en la carpeta public */}
      <img 
          src="/Img/pago.png" 
          alt="Pago exitoso" 
          className="mx-auto mb-5 w-48 h-48" 
      />
      <p className="text-lg mb-5">Gracias por tu compra. Tu pedido se ha procesado exitosamente.</p>
      <Link href="/pricing">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Ir a la tienda
          </button>
      </Link>
    </div>
  );
}

export default SuccessPage;
