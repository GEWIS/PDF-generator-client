import { Controller } from 'tsoa';
import { ContractParameters } from '../services/contractService';
import { FileSettings } from '../helpers/fileManager';
export declare enum ContractType {
    CONTRACT = "contract",
    QUOTE = "quote"
}
export interface ContractRouteParams {
    params: ContractParameters;
    settings: FileSettings;
}
export declare class ContractController extends Controller {
    /**
     * Generates a contract as Tex of PDF file.
     * Supply all contract parameters and contract type and receive the corresponding contract
     */
    generateContract(type: ContractType, params: ContractRouteParams): Promise<any>;
}
