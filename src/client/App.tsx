import React, { useMemo, useState } from 'react'
import AppsClientProcess from './AppsClientProcess'

function App() {
  const [count, setCount] = useState(0)
  useMemo(() => {
    AppsClientProcess()
  }, [])
  return (
    <>
      <h1>Hello world</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
