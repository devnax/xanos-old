import React from 'react'
import ReactDOM from 'react-dom/client'
import './initialize/initialApps'
import "./initialize/actions"
import "./initialize/settings"
import "./initialize/permissions"
import Layout from './core/Layout'

ReactDOM.createRoot(document.getElementById('root')!).render(<Layout />)
