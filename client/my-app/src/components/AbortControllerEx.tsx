interface User {
  id: number
  name: string
  email: string
}

const UsersComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    // Destructuring abort and signal from a new AbortController instance
    const { abort, signal } = new AbortController()

    const fetchData = async () => {
      try {
        const response = await fetch('https://example.com/api/users', {
          signal,
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        // Assuming the response is an array of users, cast it to User[] type
        const data: User[] = await response.json()
        setUsers(data)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error)
        }
      }
    }

    fetchData()

    // Cleanup function to abort fetch on component unmount
    return () => {
      abort()
    }
  }, []) // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsersComponent
