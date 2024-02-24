import { useState } from 'react'
// import { useHistory } from 'react-router-dom'

interface AuthFormProps {
  apiUrl?: string
}

type FormInput = {
  email: string
  password: string
}

export const AuthForm = ({ apiUrl }: AuthFormProps): JSX.Element => {
  const [formData, setFormData] = useState<FormInput>({
    email: '',
    password: '',
  })
  const [isLogin, setIsLogin] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  //   const history = useHistory()

  const formOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const url = `${apiUrl}/users/${isLogin ? 'login' : 'register'}`
    const body = isLogin
      ? { email: formData.email, password: formData.password }
      : formData

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    })

    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('jwt', data.token) //TODO: place in User Context
      // history.push('/dashboard') // or wherever you wish to redirect
      console.log(`${isLogin ? 'Login' : 'Register'} is successful`)
    } else {
      const error = await response.text()
      setErrorMessage(error)
    }
  }

  const { email, password } = formData
  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={formOnChange}
        ></input>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={formOnChange}
        ></input>

        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      <button onClick={() => setIsLogin((prev) => !prev)}>
        {isLogin ? 'Need to register?' : 'Already have an account?'}
      </button>
    </div>
  )
}
