export declare enum Language {
    DUTCH = "DUTCH",
    ENGLISH = "ENGLISH"
}
export interface Identity {
    firstName: string;
    lastNamePreposition: string;
    lastName: string;
    fullName: string;
    function?: string;
}
export interface Dates {
    date: Date;
    dueDate?: Date;
    dueDays?: number;
    startDate?: Date;
    endDate?: Date;
}
export interface Company {
    name: string;
    id?: string;
}
export interface Address {
    street: string;
    postalCode: string;
    city: string;
    country: string;
}
export interface References {
    ourReference?: string;
    yourReference?: string;
}
export interface BaseParameters {
    subject: string;
    sender: Identity;
    recipient: Identity;
    dates: Dates;
    company: Company;
    address: Address;
    reference?: References;
}
export interface Country {
    Code: string;
    Name: string;
}
export default class LetterService {
    private readonly defaultDueDays;
    constructor();
    /**
     * Given the letter string, replace the "basic" placeholder strings with actual information
     * @param letter {string} Template file
     * @param language {Language} Language to be used
     * @param subject {string} Subject of the letter
     * @param sender {Identity} Sender of the letter
     * @param recipient {Identity} Receiver of the letter
     * @param company {Company} Company letter is addressed to
     * @param dates {Dates} Date information of the letter
     * @param address {Address} Address noted on the letter
     * @param reference {References} References used on the letter
     */
    generateBaseTexLetter(letter: string, language: Language, subject: string, sender: Identity, recipient: Identity, company: Company, dates: Dates, address: Address, reference?: References): string;
    /**
     * Add signees to the letter
     * @param file {string} The .tex file, parsed as a string
     * @param firstSignee {Identity} The first signee
     * @param secondSignee {Identity} The second signee
     * @returns {string} The letter with signees added
     */
    createSignees(file: string, firstSignee: Identity, secondSignee: Identity): string;
}
