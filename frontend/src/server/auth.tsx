import { createCookieSessionStorage } from "solid-start/session";
import server, { json, redirect } from "solid-start/server";
import { Session } from "solid-start/session/sessions";
import { RC, withRC } from "~/util";
import { createResource } from "solid-js";
import { loginInstance, registerInstance } from "~/axios";

// https://git.lufrai.org/katywings/solid-directus-app/src/branch/master/src/server/auth.tsx

const storage = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    // secure doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: true,
    secrets: ["hello"],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export const login = async (
    rc: RC,
    email: string,
    password: string,
    redirectTo = "/" as string | false
    ) => {
    const session = await storage.getSession();
    if (isLoggedIn(session)) {
        if (redirectTo) {
        throw redirect(redirectTo);
        }
        return;
    }
    const loginData = await loginInstance.post('/token/', {
                                email: email,
                                password: password
                            }).then((res) => res.data);
    session.set("email", email);
    setAuthInSession(session, loginData.access, loginData.refresh);
    const newCookie = await storage.commitSession(session);
    const response = {
        headers: {
        "Set-Cookie": newCookie,
        },
    };
    rc.responseHeaders.set("Set-Cookie", newCookie);
    throw redirectTo ? redirect(redirectTo, response) : json({}, response);
};

export const isLoggedIn = (session: Session) => {
  return session.has("accessToken");
};

const setAuthInSession = (
    session: Session,
    access_token: String,
    refresh_token: String
    ) => {
    session.set("accessToken", access_token);
    session.set("refreshToken", refresh_token);
    session.set("tokenTime", new Date().getTime());
    console.log("new session data", session.data);
};

//export const refreshAuthToken = async (rc: RC) => {
//  const session = await getSession(rc);
//  if (!isLoggedIn(session)) {
//    console.log("no refresh token");
//    return;
//  }
//  const refreshToken = session.get("refreshToken");
//  const tokenTime = session.get("tokenTime");
//  const tokenExpires = session.get("tokenExpires");
//  // console.log(tokenTime, Number.isInteger(tokenTime))
//  // console.log(tokenExpires, Number.isInteger(tokenExpires))
//  if (false && new Date().getTime() < tokenTime + tokenExpires / 2) {
//    console.log("not expired");
//    return;
//  }
//  console.log("token gets refreshed", refreshToken);
//  try {
//    const refreshData = await directus.refresh({ refreshToken });
//    setAuthInSession(session, refreshData);
//    const newCookie = await storage.commitSession(session);
//    rc.responseHeaders.set("Set-Cookie", newCookie);
//    return json(
//      {},
//      {
//        headers: {
//          "Set-Cookie": newCookie,
//        },
//      }
//    );
//  } catch (err) {
//    console.error("Refresh has failed");
//    console.error(err);
//  }
//  return false;
//};
//
//export const serveRefreshAuthToken = server(
//  withRC((rc) => refreshAuthToken(rc))
//);

export const getSession = async (rc: RC) => {
  if (rc.context.session) {
    return rc.context.session;
  }
  const session = await storage.getSession(rc.request.headers.get("Cookie"));
  rc.context.session = session;
  return session;
};

export const getSessionData = async (rc: RC) => {
  const session = await getSession(rc);
  return session.data;
};

export const logout = async function (
  rc: RC,
  redirectTo = "/" as string | false
) {
  const session = await getSession(rc);
  if (!isLoggedIn(session)) {
    if (redirectTo) {
      throw redirect(redirectTo);
    }
    return;
  }
  const newCookie = await storage.destroySession(session);
  const response = {
    headers: {
      "Set-Cookie": newCookie,
    },
  };
  rc.responseHeaders.set("Set-Cookie", newCookie);
  throw redirectTo ? redirect(redirectTo, response) : json({}, response);
};

export const serveLogout = server(withRC((rc) => logout(rc, false)));

//export const authData = (
//  options_: { redirectNoAuth?: string; redirectWithAuth?: string } = {}
//) =>
//  function () {
//    const [refreshy] = useRefreshy();
//    const fetcher = refreshy(
//      server(
//        withRC(async (rc, options: typeof options_) => {
//          const data = await getSessionData(rc);
//          if (options.redirectNoAuth && !data?.username) {
//            throw redirect(options.redirectNoAuth);
//          }
//          if (options.redirectWithAuth && data?.username) {
//            throw redirect(options.redirectWithAuth);
//          }
//          return { username: data.username };
//        })
//      )
//    );
//    return createResource(() => fetcher(options_), {
//      name: "auth",
//      deferStream: true,
//    });
//  };
//