export const isFunction = (val: any) => typeof val === 'function'
export const isArray = (val: any) => typeof val === 'object' && Array.isArray(val)
export const isObject = (val: any) => typeof val === 'object' && val !== null && !Array.isArray(val)
export const isString = (val: any) => typeof val === 'string'
export const isNumber = (val: any) => !isNaN(val)
export const isInteger = (val: any) => typeof val === 'number'
export const isBool = (val: any) => typeof val === 'boolean'
export const isNull = (val: any) => val === null
export const isUrl = (val: any) => {
   const url = new URL(val);
   return url.protocol === "http:" || url.protocol === "https:"
}

export const isEmail = (val: string) => {
   const valid = val?.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
   return valid === null ? false : true
}