import { ContractType } from '../controllers/contractController';
import LetterService, { BaseParameters, Identity } from './letterService';
import { FileSettings } from '../helpers/fileManager';
import { Product, TotalPricing } from '../helpers/componentGenerator';
export interface QuoteParameters extends BaseParameters {
    products: Product[];
    pricing: TotalPricing;
}
export interface ContractParameters extends QuoteParameters {
    firstSignee: Identity;
    secondSignee: Identity;
}
export default class ContractService {
    private readonly templateDir;
    private readonly stationeryDirGEWIS;
    private readonly stationeryDirBAC;
    private readonly quoteName;
    private readonly contractNameDutch;
    private readonly contractName;
    private readonly workDir;
    constructor();
    /**
     * Generate a file based on a contract. Can be an actual contract or a proposal
     * @param settings {FileSettings} The corresponding generation settings
     * @param parameters {ContractParameters} The parameters used for generating the contract
     * @param type {ContractType} The type of the contract
     * @param letterService {LetterService} Service for filling out letter
     * @returns {string} The absolute location of the generated file
     */
    generateContract(settings: FileSettings, parameters: ContractParameters, type: ContractType, letterService: LetterService): Promise<string>;
}
