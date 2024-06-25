import * as core from '@actions/core'
import { EnvObject } from './types'

/**
 * Export key value pair from the EnvObject as environment variables
 * @param entries The content of the .env file as an EnvObject
 * @param mask A boolean flag indicating whether to mask the value
 * @param removeQuotes A boolean flag indicating whether to remove quotes if the value is wrapped in them
 * @returns {void}
 */
export function exportVariables(
  entries: EnvObject,
  mask: boolean,
  removeQuotes: boolean
): void {
  try {
    for (const [key, value] of Object.entries(entries)) {
      let finalValue = value
      if (
        removeQuotes &&
        ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'")))
      ) {
        finalValue = value.slice(1, -1)
      }
      if (mask) {
        core.setSecret(finalValue)
      }
      core.exportVariable(key, finalValue)
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    } else {
      throw new Error(`Error exporting variables`)
    }
  }
}
