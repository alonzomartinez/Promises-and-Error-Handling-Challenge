import {fetchProductCatalog, fetchProductReviews, fetchSalesReport} from "./apiSimulator";
import type { Product, Review } from "./apiSimulator";
import { NetworkError, DataError } from "./errors.ts";

console.log("Starting E-commerce Dashboard Operations...\n");

// Begin the promise chain by fetching the first catalog
fetchProductCatalog()
    .then((products: Product[]) => {
        console.log("--- Product Catalog Retrieved Successfully ---");
        console.log(products);
        console.log("\nFetching reviews for all retrieved products...");

        // For every product found, create a promise that fetches its reviews
        const reviewPromises = products.map((product) => {
            return fetchProductReviews(product.id).then((reviews: Review[]) => {
                return {
                    productName: product.name,
                    reviews: reviews
                };
            });
        });

        // Promise.all waits until all review requests resolve successfully
        return Promise.all(reviewPromises);
    })
    .then((productsWithReviews) => {
        console.log("--- Product Reviews Retrieved Successfully ---");
        productsWithReviews.forEach((item) => {
            console.log(`Reviews for ${item.productName}:`, item.reviews);
        });

        console.log("\nFetching global sales report...");
        // Return the final promise to chain it downstream
        return fetchSalesReport();
    })
    .then((salesReport) => {
        console.log("--- Sales Report Retrieved Successfully ---");
        console.log(salesReport);
    })
    .catch((error: unknown) => {
        // Handle custom errors by identifying their specific class type
        console.error("\n!!! An error occurred during dashboard execution !!!");
        
        if (error instanceof NetworkError) {
            console.error(`[NETWORK ERROR]: ${error.message}`);
        } else if (error instanceof DataError) {
            console.error(`[DATA ERROR]: ${error.message}`);
        } else if (error instanceof Error) {
            console.error(`[GENERIC ERROR]: ${error.message}`);
        } else {
            console.error(`[UNKNOWN ERROR]:`, error);
        }
    })
    .finally(() => {
        // Runs regardless of whether the operations succeeded or encountered errors
        console.log("\nDashboard workflow complete. All asynchronous actions attempted.");
    });