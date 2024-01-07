import React from 'react'
import ReactDOM from 'react-dom/client'
import './initials/initialApps'
import "./initials/listeners"
import "./initials/settings"
import "./initials/permissions"
import OSMain from './main'

ReactDOM.createRoot(document.getElementById('root')!).render(<OSMain />)
