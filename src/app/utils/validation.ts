// utils/validation.ts

import { filePattern } from "@/app/utils/constants";
import type { File } from "@/types/stateTypes";

/**
 * Checks if a filename meets naming requirements.
 * @param {string} fileName - The name of the file to validate.
 * @returns {boolean} - Returns true if the name is valid, otherwise false.
 */
export const isValidFileName = (fileName: string): boolean => {
	return filePattern.test(fileName);
};

/**
 * Checks if a filename is unique within a given list of files.
 * @param {string} fileName - The name of the file to check for uniqueness.
 * @param {File[]} files - The current list of files to compare against.
 * @returns {boolean} - Returns true if the name is unique, otherwise false.
 */
export const isUniqueFileName = (fileName: string, files: File[]): boolean => {
	return !files.some((file) => file.name === fileName);
};

