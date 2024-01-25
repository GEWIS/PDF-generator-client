import { Controller } from 'tsoa';
import { FileSettings } from '../helpers/fileManager';
import { InvoiceParameters } from '../services/invoiceService';
export declare enum InvoiceType {
    INVOICE = "invoice",
    WEEKLYSALES = "weeklysales",
    CREDIT = "creditnota"
}
export interface InvoiceRouteParams {
    params: InvoiceParameters;
    settings: FileSettings;
}
export declare class InvoiceController extends Controller {
    /**
     * Generates an invoice as Tex of PDF file.
     * Supply all invoice parameters and invoice type and receive the corresponding invoice
     */
    generateInvoice(type: InvoiceType, params: InvoiceRouteParams): Promise<any>;
}
