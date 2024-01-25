/**
 * Replace all occurrences of the "from" string with the "to" string in the "src" string
 * @param src {string} Source
 * @param from {string} String to replace
 * @param to {string} To replace all with
 */
export declare function replaceAll(src: string, from: string, to: string): string;
/**
 * Replace all occurrences of the "from" string with the "to" string in the "src" string
 * Keeps characters in mind that need to be escaped in LaTeX
 * @param file {string} Source
 * @param from {string} String to replace
 * @param to {string} To replace all with
 */
export declare function replaceAllSafe(file: string, from: string, to: string): string;
