import Stack from "naxui/Stack";
import React from "react";
import { App } from "../../App";
import Window from "../../Window";

const AppCard = ({ icon, appId }: any) => {
    return (
        <Stack
            width={100}
            height={100}
            radius={2}
            bgcolor="color.paper.light"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            hover={{
                shadow: 10
            }}
            onClick={() => {
                App.closeDrawer()
                Window.setActiveApp(appId)
            }}
        >
            {icon}
        </Stack>
    )
}

export default AppCard