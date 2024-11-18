import { NextResponse } from "next/server";
import { Stripe } from 'stripe';

export async function POST(request) {
    const { cartItems } = await request.json(); 
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    try {
       
        const lineItems = cartItems.map(item => ({
            price_data: {
                currency: item.currency || 'usd', 
                product_data: {
                    name: item.productName,
                    images: [item.productImage], 
                },
                unit_amount: item.unit_amount, 
            },
            quantity: item.quantity || 1, 
        }));

      
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cart', 
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Error al crear la sesión de pago:", error);
        return NextResponse.json({ error: "Error al crear la sesión de pago" }, { status: 500 });
    }
}
