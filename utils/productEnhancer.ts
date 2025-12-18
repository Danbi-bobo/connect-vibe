import { ProductRecommendation } from '../types';
import { getProductDisplayData } from './productLoader';

/**
 * Enhance a product recommendation with data from products.json
 * Merges static configuration (description, ritual) with dynamic data (name, image, price, url)
 */
export function enhanceProduct(product: ProductRecommendation): ProductRecommendation {
    const dynamicData = getProductDisplayData(product.variantId);

    if (!dynamicData) {
        console.warn(`Could not load product data for variant ID: ${product.variantId}`);
        return product;
    }

    return {
        ...product,
        name: dynamicData.name,
        image: dynamicData.image,
        price: dynamicData.price,
        url: dynamicData.url,
        // Enhance upsells recursively
        upsells: product.upsells?.map(upsell => enhanceProduct(upsell))
    };
}

/**
 * Enhance multiple products
 */
export function enhanceProducts(products: ProductRecommendation[]): ProductRecommendation[] {
    return products.map(product => enhanceProduct(product));
}
