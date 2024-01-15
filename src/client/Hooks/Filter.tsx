import React, { Fragment, isValidElement } from "react";
import { Store } from "state-range";

type PropsType = { [key: string]: any }
type CallbackType = (props?: PropsType) => Promise<any> | any;

type FilterType = {
    callback: CallbackType;
}
class Factory extends Store<FilterType> {
    multiple = true
}

class Filter {
    factories: { [key: string]: Factory } = {}

    add(path: string, callback: CallbackType, multiple = true) {
        let factory = this.factories[path]
        let isNew = false;
        if (!factory) {
            factory = new Factory
            this.factories[path] = factory
            isNew = true
        }

        if (isNew) {
            factory.multiple = multiple
        } else {
            if (!factory.multiple) return
            const has = factory.getAll().find(i => i.callback.toString() == callback.toString())
            if (has) return
        }
        factory.insert({ callback })
    }

    get(path: string, props?: PropsType, getValue?: (value: any) => Promise<any> | any) {
        let factory = this.factories[path]
        if (!factory) return
        const items = factory.getAll()
        const vals: any[] = []
        for (let item of items) {
            let val = item.callback(props)
            if (getValue) val = getValue(val)
            if (isValidElement(val)) {
                vals.push(<Fragment key={item._id}>{val}</Fragment>)
            } else {
                vals.push(val)
            }
        }
        return vals.length ? vals : undefined
    }

    remove(path: string, callback: CallbackType) {
        let factory = this.factories[path]
        if (!factory) return
        const items = factory.getAll()
        items.forEach((item) => {
            if (item.callback.toString() === callback.toString()) {
                factory.delete({ _id: item._id })
            }
        })
    }
}


export default new Filter