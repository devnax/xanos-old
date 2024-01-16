import React from "react";
import WindowView from "./Window";
import Window from "../Handler";
import Panel from './Panel'
const RenderWindow = () => {
    const windows = Window.getAll()
    return (
        <>
            {
                windows.map(win => (<WindowView key={win._id} windowId={win._id} />))
            }
            <Panel />
        </>
    )
}

export default RenderWindow