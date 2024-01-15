import React, { ReactElement, useMemo, useState } from "react"
import ViewBox from "naxui/ViewBox"
import { useMediaScreen, useWindowResize } from "naxui-manager";
import Dock from "./Dock";
import { noDispatch, withStore } from "state-range";
import WindowView from "./WindowView";
import Window from "../handlers/Window";
import { IconButtonProps } from "naxui/IconButton";
import Stack from "naxui/Stack";
import WindowListPanel from './WindowListPanel'
import shortcuts from "../initialize/shortcuts";
import Action from "../Hooks/Action";
import CONSTANCE from "../initialize/CONSTANCE";
import { isHotkey, hasActionKey } from "../utils/Hotkey";
import Desktop from "./Desktop";
import ShortcutApp from "../handlers/ShortcutApp";
import Menu from "naxui/Menu";
import isElementWritable from "../utils/isElementWritable";
import ContextMenu from "../handlers/ContextMenu";
import RenderNotch from "../core/Notch/RenderNotch";
export type EndIconType = {
    icon: () => ReactElement;
    onClick?: IconButtonProps['onClick'];
}

export type OSProps = {
    viewMode?: "mobile" | "pc";
    dockPosition?: "top" | "left" | "right" | "bottom";
    centerMode?: boolean;
    dockBgcolor?: string;
    logo?: ReactElement
}


const OS = (props: OSProps) => {
    const [height, setHeight] = useState<any>("100vh")

    useWindowResize(() => {
        if (window.innerHeight !== height) {
            setHeight(window.innerHeight)
        }
    })
    let { dockPosition } = props

    let hotkeyHandler = (e: any): any => {
        if (!hasActionKey(e)) return
        let runningApp = Window.getActiveApp()
        let keys = [
            ...(runningApp?.shortcutKeys || []),
            ...(shortcuts || [])
        ]

        for (let sk of keys) {
            if (isHotkey(sk.key, e)) {
                e.preventDefault()
                Action.dispatch(sk.action, sk.props)
                return false
            }
        }
    }

    useMemo(() => {
        noDispatch(() => {
            Action.dispatch(CONSTANCE.OS_ONLOAD)
        })
        document.addEventListener("keydown", hotkeyHandler)
        Action.dispatch(CONSTANCE.OS_ONREADY)
        return () => {
            Action.dispatch(CONSTANCE.OS_SHUTDOWN)
            document.removeEventListener("keydown", hotkeyHandler)
        }
    }, [])

    const windows = Window.getAll()
    const mediaScreen = useMediaScreen()
    const isMobile = mediaScreen.isDown("md")
    const activeWindow: any = Window.getActiveWindow()
    const { render: ShortcutRender } = ShortcutApp.getActiveApp() || {}

    dockPosition ||= isMobile ? "bottom" : "left"

    let isHorizental = dockPosition === "top" || dockPosition === "bottom"
    let flexDirection = isHorizental ? "column" : "row"
    if (dockPosition === 'bottom' || dockPosition === 'right') {
        flexDirection = isHorizental ? "column-reverse" : "row-reverse"
    }

    return (
        <ViewBox
            // backgroundImage="url(https://images.pexels.com/photos/1612353/pexels-photo-1612353.jpeg?cs=srgb&dl=pexels-eberhard-grossgasteiger-1612353.jpg&fm=jpg)"
            // backgroundSize="cover"
            // backgroundRepeat="no-repeat"

            height={height}
            width="100%"
            bgcolor={"color.paper.light"}
            header={<Dock {...props} dockPosition={dockPosition} />}
            sx={{ flexDirection, overflow: "hidden" }}
            onContextMenu={(e: any) => {
                e.preventDefault()
                Menu.close()
                if (isElementWritable(e.target)) {
                    ContextMenu(e, [
                        {
                            label: "Copy",
                            onClick: () => {

                            }
                        },
                        {
                            label: "Cut",
                            onClick: () => {

                            }
                        },
                        {
                            label: "Paste",
                            onClick: () => {

                            }
                        },
                        {
                            divider: true,
                            label: "Select All",
                            onClick: () => {

                            }
                        },
                        {
                            label: "Clear",
                            onClick: () => {

                            }
                        },
                        {
                            divider: true,
                            label: "Undo",
                            onClick: () => {

                            }
                        },
                        {
                            label: "Redo",
                            onClick: () => {

                            }
                        }
                    ])
                }
            }}
        >
            <ViewBox
                height="100%"
                footer={<RenderNotch />}
            >
                <Stack position="relative" width="100%" height="100%">
                    {
                        (!activeWindow && !ShortcutRender) && <Desktop />
                    }
                    {
                        !!ShortcutRender && <ShortcutRender />
                    }
                    {
                        windows.map(win => (<WindowView key={win._id} windowId={win._id} />))
                    }
                </Stack>
                <WindowListPanel />
            </ViewBox>
        </ViewBox>
    )
}


export default withStore(OS)