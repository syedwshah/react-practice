import './App.css'
import { AuthForm } from './components/AuthForm'

function App() {
  const baseUrl = process.env.REACT_APP_BASE_URL

  return (
    <>
      <AuthForm apiUrl={baseUrl} />
    </>
  )
}

export default App
