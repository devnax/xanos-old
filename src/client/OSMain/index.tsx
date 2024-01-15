import React from 'react'
import { ThemeProvider } from "naxui-manager";
import Auth from '../core/Auth'
import Main from './main'


const OS = () => {
    return (
        <ThemeProvider>
            <Main />
        </ThemeProvider>
    )
}

export default OS