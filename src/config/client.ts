import configs from './dynamic/client.config.js'
import { XANOSClientConfig } from './types'
export * from './types'

export const getConfig = (): XANOSClientConfig => {
    return configs as any
}