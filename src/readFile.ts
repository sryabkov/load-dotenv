import parseEnv from 'parse-dotenv'
import { EnvObject } from './types'

/**
 * Read .env file and parse into an array of key-value pairs.
 * @param filePath The full name of the .env file
 * @returns {Promise<EnvObject>} Resolves with the array of entries.
 */
export async function getFileEntries(filePath: string): Promise<EnvObject> {
  return new Promise(resolve => {
    try {
      const fileEntries: EnvObject = parseEnv(filePath)
      resolve(fileEntries)
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error parsing file ${filePath}: ${error.message}`)
    }
  })
}
