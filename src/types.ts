// redifines EnvObject from parse-dotenv (because it's not exported)
export interface EnvObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
