import configs from './dynamic/server.config'
import { XANOSServerConfig } from './types'

export * from './types'
export const getConfig = (): XANOSServerConfig => {
  return configs as any
}