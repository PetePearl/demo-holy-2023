import { createRoot } from 'react-dom/client'
import React from 'react'

import { App } from './App'
import './style.css'

const rootEl = document.querySelector('#root')

if (rootEl) {
  createRoot(rootEl).render(<App />)
} else {
  console.error('Cannot find #root element on page')
}
