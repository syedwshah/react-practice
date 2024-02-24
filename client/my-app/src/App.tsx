// import './App.css'
import { AuthForm } from './components/AuthForm'

function App() {
  const baseUrl = import.meta.env.VITE_BASE_URL
  console.log(baseUrl) //TODO: Fix read of env variable

  return (
    <>
      <AuthForm apiUrl={baseUrl || 'http://localhost:3000'} />
    </>
  )
}

export default App
