import { FormEvent } from 'react'
import { useRouter } from 'next/router'
 
export default function LoginPage() {
  const router = useRouter()
 
  async function handleSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')
 
    const response = await fetch('/api/create-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
 
    if (response.ok) {
      router.push('/profile')
    }
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <input type="username" name="username" placeholder="Usersname" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  )
}