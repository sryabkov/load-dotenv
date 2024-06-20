// redifines EnvObject from parse-dotenv (because it's not exported)
// changes the type of key value from any to string
export interface EnvObject {
  [key: string]: string
}
