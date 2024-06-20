import * as core from '@actions/core'
import { EnvObject } from './types'
import { getFileEntries } from './readFile'
import { exportVariables } from './exportVars'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const dotEnvFilePath: string = core.getInput('dotEnvFilePath')
    const maskValues: boolean = core.getBooleanInput('maskValues')

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`dotEnvFilePath: ${dotEnvFilePath}`)
    core.debug(`maskValues: ${maskValues}`)

    const entries: EnvObject = await getFileEntries(dotEnvFilePath)
    exportVariables(entries, maskValues)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
