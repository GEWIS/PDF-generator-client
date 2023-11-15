export declare class Client {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    /**
     * @return Created
     */
    generateContract(type: ContractType, body: ContractRouteParams): Promise<FileResponse>;
    protected processGenerateContract(response: Response): Promise<FileResponse>;
    /**
     * @return Created
     */
    generateInvoice(type: InvoiceType, body: InvoiceRouteParams): Promise<FileResponse>;
    protected processGenerateInvoice(response: Response): Promise<FileResponse>;
}
export declare class ValidateErrorJSON implements IValidateErrorJSON {
    message: ValidateErrorJSONMessage;
    details: {
        [key: string]: any;
    };
    constructor(data?: IValidateErrorJSON);
    init(_data?: any): void;
    static fromJS(data: any): ValidateErrorJSON;
    toJSON(data?: any): any;
}
export interface IValidateErrorJSON {
    message: ValidateErrorJSONMessage;
    details: {
        [key: string]: any;
    };
}
export declare class InternalError implements IInternalError {
    message: InternalErrorMessage;
    constructor(data?: IInternalError);
    init(_data?: any): void;
    static fromJS(data: any): InternalError;
    toJSON(data?: any): any;
}
export interface IInternalError {
    message: InternalErrorMessage;
}
export declare enum ContractType {
    Contract = "contract",
    Quote = "quote"
}
export declare class Identity implements IIdentity {
    firstName: string;
    lastNamePreposition: string;
    lastName: string;
    fullName: string;
    function?: string;
    constructor(data?: IIdentity);
    init(_data?: any): void;
    static fromJS(data: any): Identity;
    toJSON(data?: any): any;
}
export interface IIdentity {
    firstName: string;
    lastNamePreposition: string;
    lastName: string;
    fullName: string;
    function?: string;
}
export declare enum VAT {
    ZERO = "ZERO",
    LOW = "LOW",
    HIGH = "HIGH"
}
export declare class ProductPricing implements IProductPricing {
    basePrice: number;
    discount?: number;
    vatAmount: number;
    vatCategory: VAT;
    quantity: number;
    constructor(data?: IProductPricing);
    init(_data?: any): void;
    static fromJS(data: any): ProductPricing;
    toJSON(data?: any): any;
}
export interface IProductPricing {
    basePrice: number;
    discount?: number;
    vatAmount: number;
    vatCategory: VAT;
    quantity: number;
}
export declare class Product implements IProduct {
    name: string;
    details?: string;
    summary: string;
    specification?: string;
    pricing: ProductPricing;
    constructor(data?: IProduct);
    init(_data?: any): void;
    static fromJS(data: any): Product;
    toJSON(data?: any): any;
}
export interface IProduct {
    name: string;
    details?: string;
    summary: string;
    specification?: string;
    pricing: ProductPricing;
}
export declare class TotalPricing implements ITotalPricing {
    exclVat: number;
    lowVat: number;
    highVat: number;
    inclVat: number;
    constructor(data?: ITotalPricing);
    init(_data?: any): void;
    static fromJS(data: any): TotalPricing;
    toJSON(data?: any): any;
}
export interface ITotalPricing {
    exclVat: number;
    lowVat: number;
    highVat: number;
    inclVat: number;
}
export declare class Dates implements IDates {
    date: Date;
    dueDate?: Date;
    dueDays?: number;
    startDate?: Date;
    endDate?: Date;
    constructor(data?: IDates);
    init(_data?: any): void;
    static fromJS(data: any): Dates;
    toJSON(data?: any): any;
}
export interface IDates {
    date: Date;
    dueDate?: Date;
    dueDays?: number;
    startDate?: Date;
    endDate?: Date;
}
export declare class Company implements ICompany {
    name: string;
    id?: string;
    constructor(data?: ICompany);
    init(_data?: any): void;
    static fromJS(data: any): Company;
    toJSON(data?: any): any;
}
export interface ICompany {
    name: string;
    id?: string;
}
export declare class Address implements IAddress {
    street: string;
    postalCode: string;
    city: string;
    country: string;
    constructor(data?: IAddress);
    init(_data?: any): void;
    static fromJS(data: any): Address;
    toJSON(data?: any): any;
}
export interface IAddress {
    street: string;
    postalCode: string;
    city: string;
    country: string;
}
export declare class References implements IReferences {
    ourReference?: string;
    yourReference?: string;
    constructor(data?: IReferences);
    init(_data?: any): void;
    static fromJS(data: any): References;
    toJSON(data?: any): any;
}
export interface IReferences {
    ourReference?: string;
    yourReference?: string;
}
export declare class ContractParameters implements IContractParameters {
    subject: string;
    sender: Identity;
    recipient: Identity;
    dates: Dates;
    company: Company;
    address: Address;
    reference?: References;
    products: Product[];
    pricing: TotalPricing;
    firstSignee: Identity;
    secondSignee: Identity;
    constructor(data?: IContractParameters);
    init(_data?: any): void;
    static fromJS(data: any): ContractParameters;
    toJSON(data?: any): any;
}
export interface IContractParameters {
    subject: string;
    sender: Identity;
    recipient: Identity;
    dates: Dates;
    company: Company;
    address: Address;
    reference?: References;
    products: Product[];
    pricing: TotalPricing;
    firstSignee: Identity;
    secondSignee: Identity;
}
export declare enum Language {
    DUTCH = "DUTCH",
    ENGLISH = "ENGLISH"
}
export declare enum ReturnFileType {
    PDF = "PDF",
    TEX = "TEX"
}
export declare class FileSettings implements IFileSettings {
    name: string;
    language: Language;
    fileType: ReturnFileType;
    stationery?: string;
    createdAt: Date;
    constructor(data?: IFileSettings);
    init(_data?: any): void;
    static fromJS(data: any): FileSettings;
    toJSON(data?: any): any;
}
export interface IFileSettings {
    name: string;
    language: Language;
    fileType: ReturnFileType;
    stationery?: string;
    createdAt: Date;
}
export declare class ContractRouteParams implements IContractRouteParams {
    params: ContractParameters;
    settings: FileSettings;
    constructor(data?: IContractRouteParams);
    init(_data?: any): void;
    static fromJS(data: any): ContractRouteParams;
    toJSON(data?: any): any;
}
export interface IContractRouteParams {
    params: ContractParameters;
    settings: FileSettings;
}
export declare enum InvoiceType {
    Invoice = "invoice",
    Weeklysales = "weeklysales",
    Creditnota = "creditnota"
}
export declare class InvoiceReferences implements IInvoiceReferences {
    ourReference?: string;
    yourReference?: string;
    costCenter?: boolean;
    constructor(data?: IInvoiceReferences);
    init(_data?: any): void;
    static fromJS(data: any): InvoiceReferences;
    toJSON(data?: any): any;
}
export interface IInvoiceReferences {
    ourReference?: string;
    yourReference?: string;
    costCenter?: boolean;
}
export declare class InvoiceParameters implements IInvoiceParameters {
    summarizedProducts?: Product[];
    reference?: InvoiceReferences;
    products: Product[];
    pricing: TotalPricing;
    subject: string;
    sender: Identity;
    recipient: Identity;
    dates: Dates;
    company: Company;
    address: Address;
    constructor(data?: IInvoiceParameters);
    init(_data?: any): void;
    static fromJS(data: any): InvoiceParameters;
    toJSON(data?: any): any;
}
export interface IInvoiceParameters {
    summarizedProducts?: Product[];
    reference?: InvoiceReferences;
    products: Product[];
    pricing: TotalPricing;
    subject: string;
    sender: Identity;
    recipient: Identity;
    dates: Dates;
    company: Company;
    address: Address;
}
export declare class InvoiceRouteParams implements IInvoiceRouteParams {
    params: InvoiceParameters;
    settings: FileSettings;
    constructor(data?: IInvoiceRouteParams);
    init(_data?: any): void;
    static fromJS(data: any): InvoiceRouteParams;
    toJSON(data?: any): any;
}
export interface IInvoiceRouteParams {
    params: InvoiceParameters;
    settings: FileSettings;
}
export declare enum ValidateErrorJSONMessage {
    Validation_failed = "Validation failed"
}
export declare enum InternalErrorMessage {
    Internal_Server_Error = "Internal Server Error"
}
export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: {
        [name: string]: any;
    };
}
export declare class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: {
        [key: string]: any;
    };
    result: any;
    constructor(message: string, status: number, response: string, headers: {
        [key: string]: any;
    }, result: any);
    protected isApiException: boolean;
    static isApiException(obj: any): obj is ApiException;
}
