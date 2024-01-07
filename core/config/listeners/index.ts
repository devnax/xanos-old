import CONSTANCE from "../CONSTANCE";
import Listener from '../../handlers/Listener'
import Window from "../../handlers/Window";
import System from "../../handlers/System";

Listener.on(CONSTANCE.OS_WINDOW_NEXT, () => {
    System.openWindowPanel()
    Window.activeNext()
}, true)
Listener.on(CONSTANCE.OS_WINDOW_PREV, () => {
    System.openWindowPanel()
    Window.activePrev()
}, true)
Listener.on(CONSTANCE.OS_WINDOW_PANEL_TOGGLE, () => System.toggleOpenWindowPanel(), true)