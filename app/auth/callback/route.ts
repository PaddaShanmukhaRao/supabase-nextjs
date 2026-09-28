import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server' 

export async function GET(request: Request) {
  // 1. Grab the URL and the secret code Google sent back
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // 2. Decide where to send the user after logging in (e.g., to the /account page)
  const next = searchParams.get('next') ?? '/account' 

  if (code) {
    const supabase = createClient()
    
    // 3. Trade the Google code for a secure Supabase session cookie
    const { error } = await (await supabase).auth.exchangeCodeForSession(code)
    
    if (!error) {
      // 4. Success! Redirect the user into the app
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If something fails, redirect to a basic error page
  return NextResponse.redirect(`${origin}/error`)
}