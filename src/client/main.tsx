import React from 'react'
import ReactDOM from 'react-dom/client'
import './config/initialApps'
import "./config/listeners"
import "./config/settings"
import "./config/permissions"
import OS from './OS'

ReactDOM.createRoot(document.getElementById('root')!).render(<OS />)
