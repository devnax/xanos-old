import React from 'react'
import ReactDOM from 'react-dom/client'
import './config/initialApps'
import "./config/listeners"
import "./config/settings"
import "./config/permissions"
import "./dynamic/client"
import OSMain from './OSMain'


ReactDOM.createRoot(document.getElementById('root')!).render(<OSMain />)
