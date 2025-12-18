import productsData from '../products.json';

// Type definitions for products.json structure
export interface ShopifyProduct {
    id: string;
    legacyResourceId: string;
    title: string;
    sku: string | null;
    barcode: string;
    price: string;
    compareAtPrice: string;
    availableForSale: boolean;
    image: {
        id: string;
        url: string;
        altText: string | null;
    } | null;
    product: {
        id: string;
        title: string;
        handle: string;
        status: string;
        vendor: string;
        productType: string;
    };
}

export interface ProductsDatabase {
    products: ShopifyProduct[];
}

// Load the products database
const db: ProductsDatabase = productsData as ProductsDatabase;

/**
 * Find a product by its variant ID
 */
export function findProductByVariantId(variantId: string): ShopifyProduct | undefined {
    return db.products.find(p => p.legacyResourceId === variantId);
}

/**
 * Find a product by its handle (URL slug)
 */
export function findProductByHandle(handle: string): ShopifyProduct | undefined {
    return db.products.find(p => p.product.handle === handle);
}

/**
 * Find a product by product title (case-insensitive partial match)
 */
export function findProductByTitle(title: string): ShopifyProduct | undefined {
    const normalizedTitle = title.toLowerCase();
    return db.products.find(p =>
        p.product.title.toLowerCase().includes(normalizedTitle)
    );
}

/**
 * Get product display data in the format expected by the app
 */
export function getProductDisplayData(variantId: string) {
    const product = findProductByVariantId(variantId);

    if (!product) {
        console.warn(`Product with variant ID ${variantId} not found`);
        return null;
    }

    return {
        id: product.legacyResourceId,
        name: product.product.title,
        title: product.title, // Variant title
        price: `$${product.price}`,
        image: product.image?.url || '',
        url: `https://store.taichigemstone.com/products/${product.product.handle}`,
        variantId: product.legacyResourceId,
        availableForSale: product.availableForSale,
        compareAtPrice: product.compareAtPrice ? `$${product.compareAtPrice}` : undefined,
    };
}

/**
 * Search products by multiple criteria
 */
export function searchProducts(criteria: {
    handle?: string;
    variantId?: string;
    title?: string;
}): ShopifyProduct | undefined {
    if (criteria.variantId) {
        return findProductByVariantId(criteria.variantId);
    }
    if (criteria.handle) {
        return findProductByHandle(criteria.handle);
    }
    if (criteria.title) {
        return findProductByTitle(criteria.title);
    }
    return undefined;
}

export default {
    findProductByVariantId,
    findProductByHandle,
    findProductByTitle,
    getProductDisplayData,
    searchProducts,
    db
};
