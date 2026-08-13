import { NetworkError, DataError } from "./errors.ts";

// TypeScript interfaces 
export interface Product {
    id: number;
    name: string;
    price: number;
}

export interface Review {
    productId: number;
    rating: number;
    comment: string;
}

export interface SalesReport {
    totalSales: number;
    unitsSold: number;
    averagePrice: number;
}

// Simulates fetching a list of products
export const fetchProductCatalog = (): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.8) {
                resolve([
                    { id: 1, name: "Laptop", price: 1200 },
                    { id: 2, name: "Headphones", price: 200 },
                ]);
            } else {
                reject(new NetworkError("Failed to fetch product catalog due to a connection timeout."));
            }
        }, 1000);
    });
};

// Simulates fetching reviews for a specific product ID
export const fetchProductReviews = (productId: number): Promise<Review[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.85) {
                // Returns mock reviews based on the provided product ID
                resolve([
                    { productId, rating: 5, comment: "Excellent build quality!" },
                    { productId, rating: 4, comment: "Worth the price." }
                ]);
            } else {
                reject(new DataError(`Failed to fetch reviews for product ID ${productId}. Data is corrupted.`));
            }
        }, 1500);
    });
};

// Simulates fetching the global business sales report
export const fetchSalesReport = (): Promise<SalesReport> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.8) {
                resolve({
                    totalSales: 1400,
                    unitsSold: 3,
                    averagePrice: 466.67,
                });
            } else {
                reject(new NetworkError("Failed to fetch sales report. Remote server did not respond."));
            }
        }, 1000);
    });
};