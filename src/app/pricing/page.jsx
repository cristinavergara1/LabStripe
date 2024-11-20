import { Stripe } from 'stripe';
import Navbar from '../components/Navbar'; 
import ButtonCar from "../components/ButtonCar";

async function loadPrices() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    const pricesData = await stripe.prices.list({ active: true });
    
    const pricesWithProductDetails = await Promise.all(
        pricesData.data.map(async (price) => {
            const product = await stripe.products.retrieve(price.product);
            if (product.active) {
                return {
                    id: price.id,
                    unit_amount: price.unit_amount,
                    currency: price.currency,
                    productName: product.name,
                    productImage: product.images[0] || '',
                    productDescription: product.description || '', // Agregar descripción
                };
            }
            return null;
        })
    );

    return pricesWithProductDetails.filter(price => price !== null);
}


const PricingPage = async () => {
    const prices = await loadPrices();

    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center py-10">
                <div className="container">
                    <header>
                        <h1 className="text-center my-5 text-3xl font-bold text-gray-800">TIENDA DEPORTIVA BARBOSA</h1>
                        <p className="text-center text-2xl text-gray-600 mb-10">Descubre nuestros productos deportivos de alta calidad.</p>
                    </header>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {prices.map(price => (
                            <div key={price.id} className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
                                <div className="h-48 overflow-hidden rounded-t-lg">
                                    {price.productImage && (
                                        <img src={price.productImage} alt={price.productName} className="w-full h-full object-cover" />
                                    )}
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">{price.productName}</h3>
                                    <p className="text-gray-600 mb-4">{price.productDescription}</p> 
                                    <h2 className="text-xl font-bold text-blue-600 mb-4">
                                        {(price.unit_amount / 100).toFixed(2)} {price.currency.toUpperCase()}
                                    </h2>
                                    <ButtonCar product={{
                                        productName: price.productName, 
                                        unit_amount: price.unit_amount, 
                                        currency: price.currency, 
                                        productImage: price.productImage
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PricingPage;
