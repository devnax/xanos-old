import RenderWindow from './views'
import Window from './Handler'
import Action from '../../Hooks/Action'
export * from "./Handler"
export default Window

Action.on("system/window/next", () => {
    Window.showPanel()
    Window.activeNext()
}, true)
Action.on("system/window/prev", () => {
    Window.showPanel()
    Window.activePrev()
}, true)

export {
    RenderWindow
}
