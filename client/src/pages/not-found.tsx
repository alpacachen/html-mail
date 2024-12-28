import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
  return (
    <div>
      <h1>404 - 页面未找到</h1>
      <nav>
        <Link to="/">返回首页</Link>
      </nav>
    </div>
  )
}

export default NotFound 