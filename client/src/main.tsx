import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import './i18n'
import App from './App.tsx'
import './index.css'

const customTheme = {
  token: {
    colorPrimary: '#000000',
    colorInfo: '#000000',
    colorBgContainer: '#ffffff',
    colorBorder: '#d9d9d9',
    colorText: '#262626',
    colorTextSecondary: '#595959',
    colorBgTextHover: '#f5f5f5',
    colorBgTextActive: '#f0f0f0',
    borderRadius: 2,
    wireframe: true,
  },
  components: {
    Button: {
      colorPrimary: '#000000',
      defaultBg: '#ffffff',
      defaultBorderColor: '#d9d9d9',
      defaultColor: '#262626',
      primaryColor: '#ffffff',
    },
    Input: {
      colorBorder: '#d9d9d9',
      colorPrimaryHover: '#262626',
      colorText: '#262626',
      colorTextPlaceholder: '#8c8c8c',
    },
    Select: {
      colorBgContainer: '#ffffff',
      colorBorder: '#d9d9d9',
      colorText: '#262626',
      colorTextPlaceholder: '#8c8c8c',
      optionSelectedBg: '#f5f5f5',
    },
    Card: {
      colorBgContainer: '#ffffff',
      colorBorderSecondary: '#f0f0f0',
      colorText: '#262626',
    },
  },
  algorithm: theme.defaultAlgorithm,
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={customTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
)
