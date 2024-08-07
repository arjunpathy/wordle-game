import React from 'react'
import ReactDOM from 'react-dom/client'
import Wordle from './wordle/Wordle.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Wordle />
  </React.StrictMode>,
)
