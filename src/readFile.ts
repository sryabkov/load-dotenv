import parseEnv from 'parse-dotenv'

/**
 * Read .env file and parse into an array of key-value pairs.
 * @param filePath The full name of the .env file
 * @returns {Promise<any>} Resolves with the array of entries.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getFileEntries(filePath: string): Promise<any> {
  return new Promise(resolve => {
    try {
      const fileEntries = parseEnv(filePath)
      resolve(fileEntries)
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error parsing file ${filePath}: ${error.message}`)
    }
  })
}
