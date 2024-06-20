import * as core from '@actions/core'
// import EnvObject from 'parse-dotenv'
// import { getFileEntries } from './readFile'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const dotEnvFilePath: string = core.getInput('dotEnvFilePath')
    const maskValues: boolean = core.getBooleanInput('maskValues')

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Processing file ${dotEnvFilePath} ...`)

    // const entries: <EnvObject> = getFileEntries(dotEnvFilePath)

    // console.log(`dotEnvFilePathHello World')

    // entries.forEach((entry: typeof EnvObject) => {

    // Consider setting output for other workflow steps to use

    core.debug(`Finished processing file ${dotEnvFilePath} ...`)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
