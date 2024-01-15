import Filter from './Filter'
type PropsType = { [key: string]: any }
type CallbackType = (props?: PropsType,) => Promise<void> | void;
type CallbackTypeOnExcuted = ({ props, data }: { props?: PropsType, data: any }) => Promise<void> | void;

class Action {

    on(name: string, callback: CallbackType, single = false) {
        Filter.add(`action_${name}`, callback, single)
    }

    off(name: string, callback: CallbackType) {
        Filter.remove(`action_${name}`, callback)
    }

    onExcuted(name: string, callback: CallbackTypeOnExcuted) {
        Filter.add(`action_excuted_${name}`, ({ props, data }: any) => {
            callback({ props, data })
        })
    }

    dispatch(name: string, props?: PropsType) {
        const data = Filter.get(`action_${name}`, props)
        Filter.get(`action_excuted_${name}`, { props, data })
    }
}


export default new Action