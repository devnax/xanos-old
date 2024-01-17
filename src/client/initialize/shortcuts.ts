import CONSTANCE from "./CONSTANCE"
const shortcuts = [
    {
        key: "mod+right",
        action: "system/window/next",
        props: {}
    },
    {
        key: "mod+left",
        action: "system/window/prev",
        props: {}
    },
    {
        key: "mod+up",
        action: CONSTANCE.OS_WINDOW_PANEL_TOGGLE,
        props: {}
    },
    // {
    //     key: "mod+r",
    //     action: CONSTANCE.OS_WINDOW_RELOAD,
    //     props: {}
    // }
]


export default shortcuts