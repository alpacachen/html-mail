import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const Home: React.FC = () => {
  const handleGithubLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID
    const redirectUri = encodeURIComponent(
      'http://localhost:5173/auth/github/callback'
    )
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`
  }

  return (
    <div>
      <h1>工具箱</h1>
      <nav className={styles.nav}>
        <Link to="/html-mail" className={styles.link}>
          HTML邮件工具
        </Link>
        <button onClick={handleGithubLogin} className={styles.githubButton}>
          使用 GitHub 登录
        </button>
      </nav>
    </div>
  )
}

export default Home 