// import './App.css'
import { AuthForm } from './components/AuthForm'

function App() {
  const baseUrl = import.meta.env.REACT_APP_BASE_URL

  console.log(baseUrl)

  return (
    <>
      <p>hello world</p>
      <AuthForm apiUrl={baseUrl} />
    </>
  )
}

export default App
