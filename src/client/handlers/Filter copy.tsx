import React, { Fragment, isValidElement } from "react";
import { Store } from "state-range";

type PropsType = { [key: string]: any }
type CallbackType = (props?: PropsType) => Promise<any> | any;

type FilterConfig = {
    multiple?: boolean;
    valueType?: "string" | "boolean" | "number" | "array" | "object" | "function";
}

type FilterType = {
    value: any;
    key: string;
    configured: boolean;
    config?: FilterConfig
}


class Factory extends Store<FilterType> { }


class Filter {
    private factories: { [root: string]: Factory } = {}

    private defaultConfig: FilterConfig = {
        multiple: true,
        valueType: undefined
    }

    private isValidValue(type: FilterConfig['valueType'], value: any) {
        if (type === undefined) return true
        if (type === 'array') {
            return typeof value === 'object' && Array.isArray(value)
        }
        return typeof value === type
    }

    add(root: string, key: string, value: any, config?: FilterConfig) {
        let factory = this.factories[root]
        let isNew = false;
        if (!factory) {
            factory = new Factory
            this.factories[root] = factory
            isNew = true
        }

        if (isNew) {
            let _config: any = { ...this.defaultConfig }
            if (config) {
                for (let ck in this.defaultConfig) {
                    if ((config as any)[ck]) {
                        _config[ck] = (config as any)[ck]
                    }
                }
            }
            if (!this.isValidValue(_config.valueType, value)) {
                console.error(`Invalid value provided in ${root} with this key ${key}`, value)
                return
            }
            factory.insert({ value, key, configured: true, config: _config })
        } else {
            if (config) {
                console.error(`configure not allowed in ${root}`, config);
            }
            const configuredItem: FilterType = factory.find({ configured: true }) as any
            if (!configuredItem.config?.multiple) {
                console.error(`You are not able to add a item in ${root}`)
                return;
            } else {
                if (!this.isValidValue(configuredItem.config?.valueType, value)) {
                    console.error(`Invalid value provided in ${root} with this key ${key}`, value)
                    return
                }
            }

            const alreadyHasKey = factory.findFirst({ key })
            if (alreadyHasKey) {
                console.log(`${key} key already exists in ${root}`)
                return
            }
            factory.insert({ value, key, configured: false })
        }
    }

    get(root: string, getValue?: (value: any) => Promise<any> | any) {
        let factory = this.factories[root]
        if (!factory) return
        const items = factory.getAll()

        const vals: any[] = []
        for (let item of items) {
            let val = getValue ? getValue(item.value) : item.value
            vals.push(val)
        }
        return vals.length ? vals : undefined
    }

    has(root: string, key: string) {
        let factory = this.factories[root]
        if (!factory) return
        return !!factory.findFirst({ key })
    }

    remove(root: string, key: string) {
        let factory = this.factories[root]
        if (!factory) return
        factory.findFirst({ key })
    }
}


export default new Filter