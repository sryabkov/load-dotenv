import * as core from '@actions/core'
import { EnvObject } from './types'

/**
 * Export key value pair from the EnvObject as environment variables
 * @param entries The content of the .env file as an EnvObject
 * @returns {Promise<void>} Resolves with undefined.
 */
export async function exportVariables(
  entries: EnvObject,
  maskValues: boolean
): Promise<void> {
  return new Promise(resolve => {
    try {
      for (const [key, value] of Object.entries(entries)) {
        if (maskValues) {
          core.setSecret(value)
        }
        core.exportVariable(key, value)
      }
      resolve()
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error setting environment variables: ${error.message}`)
    }
  })
}
