import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div>
      <h1>工具箱</h1>
      <nav>
        <Link to="/html-mail">HTML邮件工具</Link>
      </nav>
    </div>
  )
}

export default Home 