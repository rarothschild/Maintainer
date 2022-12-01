import { createSignal, createContext, useContext } from "solid-js";

const UserContext = createContext();

export function UserProvider(props) {
    const [user, setUser] = createSignal({user:"",token:""}),
        counter = [
            user,
            {
                setUser() {u => setUser(u)}
            }
            ];


  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUser() { return useContext(UserContext); }