import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

interface AuthFormProps {
  apiUrl: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ apiUrl }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = `${apiUrl}/api/users/${isLogin ? 'login' : 'register'}`
    const body = isLogin ? { email: form.email, password: form.password } : form

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      const data = await response.json()
      // Consider the security implications of storing tokens in localStorage in a production app
      localStorage.setItem('token', data.token)
      history.push('/dashboard') // or wherever you wish to redirect
    } else {
      const error = await response.text()
      setErrorMessage(error)
    }
  }

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleInputChange}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleInputChange}
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need to register?' : 'Already have an account?'}
      </button>
    </div>
  )
}

export default AuthForm
