import { Stripe } from 'stripe';
import ButtonCheckout from '../components/ButtonCheckout';
import Navbar from  '../components/Navbar'; // Importa el componente Navbar

async function loadPrices() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    // Obtener solo precios activos
    const pricesData = await stripe.prices.list({ active: true });

    // Mapear los precios y filtrar solo los productos activos
    const pricesWithProductNames = await Promise.all(
        pricesData.data.map(async (price) => {
            // Obtener detalles del producto
            const product = await stripe.products.retrieve(price.product);
            // Solo incluir productos que están activos
            if (product.active) {
                return {
                    id: price.id,
                    unit_amount: price.unit_amount,
                    currency: price.currency,
                    productName: product.name,
                    productImage: product.images[0] || '', // Usa la primera imagen si está disponible
                };
            }
            return null; // Ignorar productos archivados
        })
    );

    // Filtrar los elementos nulos
    return pricesWithProductNames.filter(price => price !== null);
}

const PricingPage = async () => {
    const prices = await loadPrices();

    return (
        <div>
            <Navbar /> {/* Barra de navegación arriba */}
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
                                    <ButtonCheckout priceId={price.id} />
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
