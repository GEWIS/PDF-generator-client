import LetterService, { References } from './letterService';
import { InvoiceType } from '../controllers/invoiceController';
import { FileSettings } from '../helpers/fileManager';
import { Product } from '../helpers/componentGenerator';
import { QuoteParameters } from './contractService';
export interface InvoiceReferences extends References {
    costCenter?: boolean;
}
export interface InvoiceParameters extends Omit<QuoteParameters, 'reference'> {
    summarizedProducts?: Product[];
    reference?: InvoiceReferences;
}
export default class InvoiceService {
    private readonly templateDir;
    private readonly stationeryDirGEWIS;
    private readonly stationeryDirBAC;
    private readonly invoiceName;
    private readonly invoiceNameWeekly;
    private readonly workDir;
    constructor();
    /**
     * Generate a file based on an invoice. Can be a standard invoice, or a weekly sales invoice / creditnota
     * @param settings {FileSettings} The corresponding generation settings
     * @param parameters {InvoiceParameters} The parameters used for generating the invoice
     * @param type {InvoiceType} The type of the invoice
     * @param letterService {LetterService} Service for filling out letter
     */
    generateInvoice(settings: FileSettings, parameters: InvoiceParameters, type: InvoiceType, letterService: LetterService): Promise<string>;
}
