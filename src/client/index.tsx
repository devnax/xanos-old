import React from 'react'
import ReactDOM from 'react-dom/client'
import './initialize/initialApps'
import "./initialize/actions"
import "./initialize/settings"
import "./initialize/permissions"
import Layout from './core/Layout'
import { AuthView } from './core/Auth'
import { ThemeProvider } from "naxui-manager";

const Root = () => {
    return (
        <ThemeProvider>
            <AuthView />
            <Layout />
        </ThemeProvider>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />)
