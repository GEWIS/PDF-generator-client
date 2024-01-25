export interface ProductPricing {
    basePrice: number;
    discount?: number;
    vatAmount: number;
    vatCategory: VAT;
    quantity: number;
}
export interface Product {
    name: string;
    details?: string;
    summary: string;
    specification?: string;
    pricing: ProductPricing;
}
export interface TotalPricing {
    exclVat: number;
    lowVat: number;
    highVat: number;
    inclVat: number;
}
export declare enum VAT {
    ZERO = "ZERO",
    LOW = "LOW",
    HIGH = "HIGH"
}
/**
 * Replace the pricing table placeholders in the .tex file with the actual pricing table
 * @param file {string} The .tex file parsed as a string
 * @param products {Array<Product>} Products for which the pricing table should be created
 * @param total {TotalPricing} Total pricing details of the provided products
 * @param replaceString {string?} Possible alternative replace string for the table
 * @returns {string} .tex file parsed as string with complete pricing table
 */
export default function createPricingTable(file: string, products: Product[], total: TotalPricing, replaceString?: string): string;
/**
 * Replace the product list placeholders in the .tex file with the actual products
 * @param file {string} The .tex file parsed as a string
 * @param products {Array<Product>} Products which should be listed
 * @returns {string} .tex file parsed as string with complete product list
 */
export declare function createProductList(file: string, products: Product[]): string;
/**
 * Replace the specification list placeholders in the .tex file with the actual specifications
 * @param file {string} The .tex file parsed as a string
 * @param products {Array<Product>} Products of which specifications should be listed
 * @returns {string} .tex file parsed as string with complete specification list, or sentence giving notice of its absence
 */
export declare function createSpecificationList(file: string, products: Product[]): string;
