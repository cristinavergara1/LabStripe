import { Stripe } from 'stripe';
// import ButtonCheckout from '../components/ButtonCheckout';
import Navbar from  '../components/Navbar'; 
import ButtonCar from "../components/ButtonCar";

async function loadPrices() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    // Obtener solo precios activos
    const pricesData = await stripe.prices.list({ active: true });

    // Mapear los precios y filtrar solo los productos activos
    const pricesWithProductNames = await Promise.all(
        pricesData.data.map(async (price) => {
            const product = await stripe.products.retrieve(price.product);
            if (product.active) {
                return {
                    id: price.id,
                    unit_amount: price.unit_amount,
                    currency: price.currency,
                    productName: product.name,
                    productImage: product.images[0] || '',
                };
            }
            return null;
        })
    );

    return pricesWithProductNames.filter(price => price !== null);
}

const PricingPage = async () => {
    const prices = await loadPrices();

    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center h-screen">
                <div>
                    <header><h1 className="text-center my-5">TIENDA DEPORTIVA BARBOSA</h1></header>
                    <div className="flex gap-x-2">
                        {
                            prices.map(price => (
                                <div key={price.id} className="bg-slate-300 mb-2 p-4">
                                    <h3 className="text-xl font-semibold mb-2">{price.productName}</h3>
                                    {price.productImage && (
                                        <img src={price.productImage} alt={price.productName} className="w-full h-40 object-cover mb-2" />
                                    )}
                                    <h2 className="text-3xl font-bold mb-4">
                                        Precio: {(price.unit_amount / 100).toFixed(2)} {price.currency.toUpperCase()}
                                    </h2>
                                    {/* Pasar el producto como prop a ButtonCar */}
                                    <ButtonCar product={{ 
    productName: price.productName, 
    unit_amount: price.unit_amount, 
    currency: price.currency, 
    productImage: price.productImage 
}} />

                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PricingPage;
