import React from 'react'
import ReactDOM from 'react-dom/client'

import { ConfigProvider } from 'antd'
import './index.css'
import App from './components/App'

// const customTheme = {
//    token: {
//       colorPrimary: '#fadb14',
//       colorInfo: '#fadb14',
//    },
//    algorithm: 'dark',
// }

const customTheme = {}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <React.StrictMode>
      <ConfigProvider theme={customTheme}>
         <App />
      </ConfigProvider>
   </React.StrictMode>
)
