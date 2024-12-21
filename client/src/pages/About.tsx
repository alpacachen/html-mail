import React from 'react'
import { Link } from 'react-router-dom'

const About: React.FC = () => {
  return (
    <div>
      <h1>关于我们</h1>
      <nav>
        <Link to="/">返回首页</Link>
      </nav>
    </div>
  )
}

export default About 