import { useState } from 'react'

interface AuthFormProps {
  apiUrl?: string
}

type FormInput = {
  username: string
  email: string
  password: string
}

export const AuthForm = ({ apiUrl }: AuthFormProps): JSX.Element => {
  const [formData, setFormData] = useState<FormInput>({
    username: '',
    email: '',
    password: '',
  })
  const [isLogin, setIsLogin] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const formOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${apiUrl}/users/${isLogin ? 'login' : 'register'}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            isLogin
              ? formData
              : { email: formData.email, password: formData.password },
          ),
        },
      )

      if (!res.ok) {
        throw new Error('Something went wrong')
      } else {
        const error = await res.text()
        setErrorMessage(error)
      }

      const data = await res.json()

      localStorage.setItem('token', data.token) //TODO: place in User Context
    } catch (error) {
      console.error('Error validating user: ', error)
    }
  }

  const { username, email, password } = formData
  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={formOnChange}
          ></input>
        )}
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

// import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'

// interface AuthFormProps {
//   apiUrl: string;
// }

// const AuthForm: React.FC<AuthFormProps> = ({ apiUrl }) => {
//   const [isLogin, setIsLogin] = useState(true)
//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     password: '',
//   })
//   const [errorMessage, setErrorMessage] = useState('')
//   const history = useHistory()

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setForm((prevForm) => ({
//       ...prevForm,
//       [name]: value,
//     }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const url = `${apiUrl}/api/users/${isLogin ? 'login' : 'register'}`
//     const body = isLogin ? { email: form.email, password: form.password } : form

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     })

//     if (response.ok) {
//       const data = await response.json()
//       // Consider the security implications of storing tokens in localStorage in a production app
//       localStorage.setItem('token', data.token)
//       history.push('/dashboard') // or wherever you wish to redirect
//     } else {
// const error = await response.text()
// setErrorMessage(error)
//     }
//   }

//   return (
//     <div>
//       <h2>{isLogin ? 'Login' : 'Register'}</h2>
//       <form onSubmit={handleSubmit}>
//         {!isLogin && (
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={form.username}
//             onChange={handleInputChange}
//           />
//         )}
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleInputChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleInputChange}
//         />
//         <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
//         {errorMessage && <p>{errorMessage}</p>}
//       </form>
{
  /* <button onClick={() => setIsLogin(!isLogin)}>
  {isLogin ? 'Need to register?' : 'Already have an account?'}
</button> */
}
//     </div>
//   )
// }

// export default AuthForm
