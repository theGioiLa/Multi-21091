import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import 'video.js/dist/video-js.css'
import App from './App'

const rootElement = document.getElementById('root')

if (rootElement) {
    ReactDOM.render(<App />, rootElement)
} else {
    throw new Error('Could not found root element to mount to!')
}

