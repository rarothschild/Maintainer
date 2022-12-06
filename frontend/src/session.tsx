import { createCookieSessionStorage, FormError, redirect } from 'solid-start'

// https://tahazsh.com/blog/building-a-solidjs-app-from-scratch/

import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/';

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
    
    const axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 5000,
      headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
      }
    })

    const tokens = await axiosInstance.post('token/', {
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

export const getUser = async (request: Request) => {

    const session = await storage.getSession(request.headers.get('Cookie'))
    const token = session.get('token')
    if (!token) {
      console.log('No auth token found')
      return null
    }

    console.log(token)

    const axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 5000,
      headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          accept: 'application/json',
      }
    })
  
    const user = await axiosInstance.get('user/')
                                    .then((res) => res.data)
  
    const result = await urqlClient().query(CURRENT_USER, {}).toPromise()
  
    if (!result.data?.currentUser) {
      return redirect('/login')
    }
    return result.data.currentUser
  }