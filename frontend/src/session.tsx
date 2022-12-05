import { createCookieSessionStorage, FormError, redirect } from 'solid-start'
import { loginInstance } from './axios'

// https://tahazsh.com/blog/building-a-solidjs-app-from-scratch/

const storage = createCookieSessionStorage({
  cookie: {
    name: import.meta.env.VITE_COOKIE_TOKEN_KEY,
    secure: true,
    secrets: [import.meta.env.VITE_COOKIE_SECRET_KEY],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
})

interface LoginForm {
    email: string
    password: string
}

export const login = async ({ email, password }: LoginForm) => {
    
    const tokens = await loginInstance.post('token/', {
        email: email,
        password: password
    }).then((res) => res.data)
    console.log(tokens)
    const token_access = tokens.access
    const token_refresh = tokens.refresh
  
    const session = await storage.getSession()
    session.set('tokenAccess', token_access)
    session.set('tokenRefresh', token_refresh)
    return {
      'Set-Cookie': await storage.commitSession(session)
    }
  }

export async function getAccessToken(request: Request) {
    const session = await storage.getSession(
      request.headers.get('Cookie')
    );
   
    const token = session.get('tokenAccess');
    return token;
  }

