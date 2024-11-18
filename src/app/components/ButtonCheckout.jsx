"use client";

function ButtonCheckout({ cartItems }) {
  return (
    <button
      className="bg-sky-500 text-white px-4 py-2 rounded"
      onClick={async () => {
        // Enviar los artículos del carrito al servidor para crear la sesión de pago
        const res = await fetch('/api/checkout', {
          method: 'POST',
          body: JSON.stringify({ cartItems }), // Mandamos todos los artículos del carrito
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        // Redirigir a la página de Stripe Checkout
        window.location.href = data.url;
      }}
    >
      Pagar
    </button>
  );
}

export default ButtonCheckout;
