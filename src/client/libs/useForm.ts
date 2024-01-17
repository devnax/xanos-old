"use client"
import { useState } from "react"
import { any, object, SchemaFactory, watch } from './validex'

type SchemaObject<Fields> = { [field in keyof Fields]: typeof SchemaFactory }
type SchemaArgCallback<Fields> = (s: typeof SchemaFactory) => SchemaObject<Fields>
type SchemaArg<Fields> = Partial<{ [key in keyof Fields]: SchemaArgCallback<Fields> }>

export type UseFormType<Fields extends {}> = ReturnType<typeof useForm<Fields>>

export type FormConfig<Fields extends {}> = {
    onChange?: <T extends keyof (Fields) >(field?: T) => void;
    onError?: () => void;
}

const useForm = <Fields extends {}>(_data: Fields, formConfig?: FormConfig<Fields>) => {
    const [state, setState] = useState<Record<string, any>>()
    const [data, setData] = useState<Fields>(_data)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<Fields>({} as any)
    let schemas: SchemaArg<Fields>;


    const factory = {
        set: <T extends keyof (Fields)>(name: T, value: (Fields)[T]) => {
            setData(p => ({ ...p, [name]: value }))
            formConfig?.onChange && formConfig.onChange(name)
        },
        get: <T extends keyof (Fields)>(name: T, def?: any) => data[name] || def,
        delete: <T extends keyof (Fields)>(name: T) => {
            if (data[name]) {
                setData(p => {
                    let s = { ...p }
                    delete s[name]
                    return s
                })
                formConfig?.onChange && formConfig.onChange(name)
            }
        },
        clear: () => {
            setData(p => {
                let _d: any = {};
                for (let f in p) _d[f] = null
                return _d
            })
            formConfig?.onChange && formConfig.onChange()
        },
        getData: () => data,
        setState: (_state: Record<string, any>) => {
            setState(p => ({ ...p, ..._state }))
            formConfig?.onChange && formConfig.onChange()
        },
        getState: () => state,
        loading: (is = true) => {
            setLoading(is)
        },
        isLoading: loading,
        setSchema: (schema: SchemaArg<Fields>) => {
            schemas = schema
        },
        validate: () => {
            let errors: any = {}
            if (schemas) {
                let _schema: any = {};
                let _data: any = {}
                for (let field in schemas) {
                    const cb = schemas[field] as SchemaArgCallback<Fields>
                    _schema[field] = cb(any().field(field))
                    _data[field] = factory.get(field) || ""
                }
                if (Object.keys(_schema)) {
                    const err = watch(object(_schema), _data)
                    if (err) {
                        errors = err.error
                    }
                }
            }
            setErrors(errors)
            return !Object.keys(errors).length
        },
        hasError: <T extends keyof (Fields)>(name?: T) => {
            return !!(name ? factory.getError(name) : Object.keys(errors).length)
        },
        getError: <T extends keyof (Fields)>(name: T) => errors[name],
        setError: <T extends keyof (Fields)>(name: T, value: string) => {
            setErrors(e => ({ ...e, [name]: value }))
            formConfig?.onError && formConfig.onError()
        },
        getErrors: () => errors,
        removeError: <T extends keyof (Fields)>(name: T) => {
            if (errors[name]) {
                setErrors(p => {
                    let s = { ...p }
                    delete s[name]
                    return s
                })
            }
        },
        clearError: () => {
            setErrors({} as any)
        },
    }

    return factory
}


export default useForm