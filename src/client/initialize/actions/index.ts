import CONSTANCE from "../CONSTANCE";
import Action from '../../Hooks/Action'
import Window from "../../core/Window/Handler";
import System from "../../handlers/System";

Action.on(CONSTANCE.OS_WINDOW_NEXT, () => {
    System.openWindowPanel()
    Window.activeNext()
}, true)
Action.on(CONSTANCE.OS_WINDOW_PREV, () => {
    System.openWindowPanel()
    Window.activePrev()
}, true)
Action.on(CONSTANCE.OS_WINDOW_PANEL_TOGGLE, () => System.toggleOpenWindowPanel(), true)