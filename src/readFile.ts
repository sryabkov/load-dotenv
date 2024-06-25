import parseEnv from 'parse-dotenv'
import { EnvObject } from './types'

/**
 * Read .env file and parse into an array of key-value pairs.
 * @param filePath The full name of the .env file
 * @returns { EnvObject | undefined } The array of settings or undefined
 */
export function getFileEntries(filePath: string): EnvObject {
  try {
    const fileEntries = parseEnv(filePath)
    return fileEntries
  } catch (error) {
    if (error instanceof Error) {
      throw error
    } else {
      throw new Error(`Error reading file ${filePath}.`)
    }
  }
}
