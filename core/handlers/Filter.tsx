import React, { Fragment, isValidElement } from "react";
import { Store } from "state-range";

type PropsType = { [key: string]: any }
type CallbackType = (props?: PropsType) => any;

type FilterType = {
    name: string;
    callback: CallbackType;
}
class Factory extends Store<FilterType> { }

class Filter {
    factories: { [key: string]: Factory } = {}

    add(name: string, callback: CallbackType, single = false) {
        let factory = this.factories[name]
        if (!factory) {
            factory = new Factory
            this.factories[name] = factory
        }
        const has = factory.find({ name }).find(i => i.callback.toString() == callback.toString())
        if (has) return
        factory.insert({ name, callback })
    }

    get(name: string, props?: PropsType) {
        let factory = this.factories[name]
        if (!factory) return
        const items = factory.find({ name })

        const vals: any[] = []
        for (let item of items) {
            const val = item.callback(props)
            if (isValidElement(val)) {
                vals.push(<Fragment key={item._id}>{val}</Fragment>)
            } else {
                vals.push(val)
            }
        }
        return vals.length ? vals : undefined
    }

    remove(name: string, callback: CallbackType) {
        let factory = this.factories[name]
        if (!factory) return
        const items = factory.find({ name })
        items.forEach((item) => {
            if (item.callback.toString() === callback.toString()) {
                factory.delete({ _id: item._id })
            }
        })
    }
}


export default new Filter