"use client"
import { createClient } from '@/lib/supabase/client'
import { login, signup } from './actions'

export default function LoginPage() {
  const signInWithGoogle = async () => {
    const supabase = createClient() // Make sure your Supabase client is imported

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('Error logging in with Google:', error.message)
    }
  }
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
      <button
        onClick={signInWithGoogle}
        type="button"
      >
        Sign in with Google
      </button>
    </form>
  )
}