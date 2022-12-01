import { redirect } from "solid-start/server";
import { createCookieSessionStorage } from "solid-start/session";
import axios from 'axios';
import { defaultHeaders } from "~/lib/apiConfig";

const storage = createCookieSessionStorage({
    cookie: {
      name: "seession",
      // secure doesn't work on localhost for Safari
      // https://web.dev/when-to-use-local-https/
      secure: import.meta.env.PROD,
      secrets: ["hello"],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true
    }
  });
   

export async function login(request: Request, email: string, password: string) {
    const session = await storage.getSession(
        request.headers.get('Cookie')
      );
      const body = JSON.stringify({ email, password });
      const sid = await new Promise( (resolve, reject) => {
            axios.post(`http://127.0.0.1:8000/login/`, body, defaultHeaders)
                .then((response) => response.data)
                .then((resp) => resp.token)
        })
      session.set('sid', sid);
      const response = new Response('Logged in', {
        headers: {
          'Set-Cookie': await storage.commitSession(session)
        }
      });
    
}

export async function getUser(request: Request): Promise<User | null> {
    const cookie = request.headers.get("Cookie") ?? ""
    const session = await storage.getSession(cookie);
    const userId = session.get("userId");
    if (!userId) return null;
    return await hogwarts.getUser(userId);
  }