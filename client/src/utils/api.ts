import { message } from "antd";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(url, { ...options, headers });
  
  if (response.status === 401) {
    // token 过期或无效，清除本地存储并重定向到登录页
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // message 提示 请先登录认证
    message.error('请先登录认证');
    throw new Error('Unauthorized');
  }

  return response;
} 