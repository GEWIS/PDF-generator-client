/// <reference types="node" />
import { Controller } from 'tsoa';
import * as fileSystem from 'fs';
import { Language } from '../services/letterService';
export declare enum ReturnFileType {
    PDF = "PDF",
    TEX = "TEX"
}
export declare enum Stationery {
    BAC = "BAC",
    GEWIS = "GEWIS"
}
export interface FileSettings {
    name: string;
    language: Language;
    fileType: ReturnFileType;
    stationery?: string;
    createdAt: Date;
}
/**
 * Delete the file from the system at the given path
 * @param filePath {string} Path to the file
 */
export declare function deleteFile(filePath: string): Promise<void>;
/**
 * Add the file to the response object, given the controller that handles the request
 * @param controller {Controller} Controller that handles the request
 * @param filePath {string} Path to the file
 */
export declare function prepareFileResponse(controller: Controller, filePath: string): fileSystem.ReadStream;
/**
 * Save a text file string (or .tex string) to the disk at the given path
 * @param file {string} File contents parsed to a string
 * @param filePath {string} Path to the file
 */
export declare function saveFileToDisk(file: string, filePath: string): Promise<void>;
/**
 * Convert a given .tex file to a PDF and save it at the given path
 * @param file {string} Input "file" in a string
 * @param filePath {string} Path to the file
 * @param templateDir {string} Location of all templates
 * @returns {string} The absolute location of the new .pdf file
 */
export declare function convertTexToPdf(file: string, filePath: string, templateDir: string): Promise<void>;
/**
 * Wrap up the file generation: generating a filename, saving to the proper location on disk
 * @param file {string} The .tex file parsed as a string
 * @param fileType {ReturnFileType} The file type that should be returned
 * @param workDir {string} Location to temporarily save the file to
 * @param templateDir {string} Location of template files
 */
export default function finishFileGeneration(file: string, fileType: ReturnFileType, workDir: string, templateDir: string): Promise<string>;
